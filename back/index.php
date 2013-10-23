<?php

$dbConfig = array(
    'dbType' => 'mysql',
    'dbHost' => 'localhost',
    'dbName' => 'moc_calendar',
    'dbUser' => 'root',
    'dbPassword' => '12345'
);

try {

    $connection = new PDO($dbConfig['dbType'] . ':host=' . $dbConfig['dbHost'] . ';dbname=' . $dbConfig['dbName'], $dbConfig['dbUser'], $dbConfig['dbPassword']);

} catch (PDOException $exc) {

    exit($exc->getMessage());

}

$method = $_SERVER['REQUEST_METHOD'];

$url = substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['SCRIPT_NAME'], '/') + 1);

switch ($method) {
    case 'GET':
        if (isset($_GET['term']))
            getUserById($connection);
        else {
            list($action, $id, $year) = explode('/', $url, 3);

            switch ($action) {

                case 'udays':
                    getUserDays($connection, $id, $year);
                    break;

                case 'days':
                    getDays($connection);
                    break;
            }
        }
        break;
    case 'POST':
        $action = $url;
        switch ($action) {

            case 'updateudays':
                updateUserDays($connection);
                break;

            case 'updatedays':
                updateDays($connection);
                break;
        }
        break;
    case 'PUT':
        $action = $url;
        switch ($action) {

            case 'updateudays':
                createUserDays($connection);
                break;

            case 'updatedays':
                updateDays($connection);
                break;
        }
        break;
}

function getUserById($connection) {
    $term = $_GET['term'] . '%';

    $query = "SELECT id, fullname FROM users WHERE fullname LIKE :name";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $term, PDO::PARAM_STR);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = array();

    if ($results) {

        foreach ($results as $item) {

            $json[] = array('label' => $item['fullname'], 'id' => (int)$item['id']);

        }

    }

    echo json_encode($json);
}

function getUserDays($connection, $user_id, $year) {
    $query = "SELECT days FROM calendar WHERE user_id = :user_id AND year = :year";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':year', $year, PDO::PARAM_INT);
    $stmt->execute();

    $results = $stmt->fetch(PDO::FETCH_ASSOC);

    $json = array();

    if ($results) {

        $json = array('days' => unserialize($results['days']));

    }

    echo json_encode($json);
}

function getDays($connection) {
    $query = "SELECT * FROM days WHERE 1";
    $stmt = $connection->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $json = array();

    if ($results) {

        foreach ($results as $item) {

            $json[] = $item;

        }

    }

    echo json_encode(array('days' => $json));
}

function updateDays($connection) {
    try {
        $params = json_decode(trim(file_get_contents('php://input')), true);

        $query = "UPDATE days SET title = :title, color = :color WHERE id = :id";
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':id', $params['id'], PDO::PARAM_INT);
        $stmt->bindParam(':title', $params['title'], PDO::PARAM_STR);
        $stmt->bindParam(':color', $params['color'], PDO::PARAM_STR);
        $result = $stmt->execute();

        echo json_encode(array('result' => $result));
    } catch (Exception $ex) {
        echo json_encode(array('result' => $ex));
    }
}

function updateUserDays($connection, $params = false) {
    try {
        if (!$params)
            $params = json_decode(trim(file_get_contents('php://input')), true);

        $query = "UPDATE calendar SET days = :days WHERE user_id = :user_id AND year = :year";
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':user_id', $params['id'], PDO::PARAM_INT);
        $stmt->bindParam(':year', $params['year'], PDO::PARAM_INT);
        $stmt->bindParam(':days', serialize($params['days']), PDO::PARAM_STR);
        $result = $stmt->execute();

        echo json_encode(array('result' => $result));
    } catch (Exception $ex) {
        echo json_encode(array('result' => $ex));
    }
}

function createUserDays($connection) {
    $params = json_decode(trim(file_get_contents('php://input')), true);

    $query = "SELECT id FROM calendar WHERE user_id = :user_id AND year = :year";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':user_id', $params['id'], PDO::PARAM_INT);
    $stmt->bindParam(':year', $params['year'], PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($result)) {
        updateUserDays($connection, $params);
    } else {
        try {
            $query = "INSERT INTO calendar (year, days, user_id) VALUES (:year, :days, :user_id)";
            $stmt = $connection->prepare($query);
            $stmt->bindParam(':user_id', $params['id'], PDO::PARAM_INT);
            $stmt->bindParam(':year', $params['year'], PDO::PARAM_INT);
            $stmt->bindParam(':days', serialize($params['days']), PDO::PARAM_STR);
            $result = $stmt->execute();

            echo json_encode(array('result' => $result));
        } catch (Exception $ex) {
            echo json_encode(array('result' => $ex));
        }
    }
}