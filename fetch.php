<?php

$conn = new mysqli("localhost", "root", "", "goers");

$result = $conn->query("SELECT event.id,organization_id,event.name as ename,organization.name as oname,date FROM event INNER JOIN organization ON event.organization_id = organization.id ORDER BY date");

$outp = "";
$count = 0;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"organization_id":"'   . $rs["organization_id"]        . '",';
    $outp .= '"name":"'   . $rs["ename"]        . '",';
    $outp .= '"organization_name":"'   . $rs["oname"]        . '",';
    $outp .= '"date":"'. $rs["date"]     . '"}';
    $count++;
}
$count = '"'.$count.'"';

$result = $conn->query("SELECT date,COUNT(DISTINCT(id)) FROM `event` GROUP BY date");

$outp1 = "";
$count1 = 0;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $count1++;
}

//organization
$result = $conn->query("SELECT organization.name,COUNT(DISTINCT(event.id)) as sum FROM event INNER JOIN organization ON event.organization_id = organization.id GROUP BY organization.name ORDER BY sum");
$outp2 = "";
$count2 = 0;
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp2 != "") {$outp2 .= ",";}
    $outp2 .= '{"name":"'  . $rs["name"] . '",';
    //$outp .= '"sum":"'   . $rs["sum"]        . '",';
    $outp2 .= '"sum":'. $rs["sum"]     . '}';
    $count2++;
}

$result = $conn->query("SELECT date, MAX(sum) FROM (SELECT date,COUNT(DISTINCT(event.id)) as sum FROM event GROUP BY date ORDER BY sum) as Tabel");
$goldenday = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $goldenday = $rs["date"];
}

$outp ='{"records":['.$outp.'],"count":'.$count.',"count1":'.$count1.',"graph1":['.$outp2.'],"goldenday":"'.$goldenday.'"}';
$conn->close();

echo($outp);
?>