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

switch ($method) {
    case 'GET':
        if (isset($_GET['term']))
            getUserById($connection);
        else {
            $url = substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['SCRIPT_NAME'], '/') + 1);

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