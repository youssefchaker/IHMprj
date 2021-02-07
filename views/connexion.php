<?php

$connection = mysql_connect("localhost","root",""); 
if (!$connection) {
die("Database connection failed: " . mysql_error());
}

// 2. Select a database to use 
$db_select = mysql_select_db("bd",$connection);
if (!$db_select) {
die("Database selection failed: " . mysql_error());
}

// 3. Perform database query
$result = mysql_query("SELECT * FROM users", $connection);
if (!$result) {
die("Database query failed: " . mysql_error());
}

// 4. Use returned data
while ($row = mysql_fetch_array($result)) {
echo $row["Email"]." ".$row["Password"]."<br />";
}

mysql_close($connection);