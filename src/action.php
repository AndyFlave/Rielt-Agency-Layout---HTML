<? 
	$a = $_POST['checkbox-1'];
	$b = $_POST['checkbox-2'];
	$c = $_POST['checkbox-3'];
	$d = $_POST['checkbox-4'];
	$e = $_POST['checkbox-5'];
	$f = $_POST['select-type'];
	$g = $_POST['select-view'];


	$j = $_POST['select-action'];

?>
<h1>
	<? 
	// var_dump($_POST);
	if ($j){
		echo $j;
	}
	echo $b; 
	echo $c; 
	echo $d; 
	echo $e; 
	echo $f; 
	echo $g; 
	?>
</h1>