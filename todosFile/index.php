<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
session_start();

try{
    $db = new PDO("mysql:host=localhost;dbname=todos", "root", "");
}
catch(PDOException $e){
    echo $e->getMessage();
}

$result = $_POST["action"];

switch($result){

    case 'todos':
        $stmt = $db->prepare("SELECT * FROM todos_table WHERE user_id = :user_id ORDER BY todo_id DESC");
        $stmt->execute(['user_id' => $_SESSION['user_id']]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;
    case "add-todos":
        $context = $_POST["context"];
        $data = [
            "context" => $context,
            "contextStatus" => 0,
            "user_id" => $_SESSION['user_id']
        ];
        $query = $db->prepare("insert into todos_table set context = :context, contextStatus = :contextStatus, user_id = :id");
        $query->execute([
            "context" => $data["context"],
            "contextStatus" => $data["contextStatus"],
            "id" => $_SESSION['user_id']
        ]);
        $data["todo_id"] = $db->lastInsertId();
        echo json_encode($data);
        break;
    case "update-todos":
        $id = $_POST["id"];
        $query = $db->prepare("UPDATE todos_table SET contextStatus = NOT contextStatus WHERE ser_id = :u_id AND todo_id = :id");
        $query->execute([
            "id" => $id,
            "u_id" => $_SESSION['user_id']
        ]);
        echo json_encode($id);
        break;
    case "delete-todos":
        $id = $_POST["id"];
        $query = $db->prepare("DELETE FROM todos_table WHERE user_id = :u_id AND todo_id = :id");
        $query->execute([
            "id" => $id,
            "u_id" => $_SESSION['user_id']
        ]);
        echo json_encode($id);
        break;
}
?>