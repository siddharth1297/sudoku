
function sudoku_generate() 
   {
    var grid = new Array();
    var i,j;
    for(i=0;i<9;i++)
    {
      grid[i] = new Array();
    }

    for(i=0;i<9;i++)
    {
     for(j=0;j<9;j++)
       {  
        grid[i][j] = 0;
       }
     
    }
    var row,s;
    
    for(row=0; row < 9 ;row++)
    {
      var col,val;
      
      col=Math.floor(Math.random() * 8) + 1;
      val=Math.floor(Math.random() * 9) + 1;
      while(is_safe(grid,row,col,val) == false)
      {
        val=Math.floor(Math.random() * 9) + 1;
      }
      grid[row][col] = val;
    }
    
    if(main(grid))
    	print_sudoku(grid);
    else
    	sudoku_generate();
  }


function is_safe(grid,row,col,val)
{
  for(k=0;k<9;k++)
      if(grid[row][k] == val)
        return false;

    //checking row of a column
  for(k=0;k<9;k++)
      if(grid[k][col] == val)
        return false;

    //checking small boxes
  var start_row, end_row;
  var start_col, end_col;
      if(row>=0 && row<=2)     { start_row = 0 ; end_row = 2; }
      else if(row>=3 && row<=5){ start_row = 3 ; end_row = 5; }
      else                     { start_row = 6 ; end_row = 8; }
      if     (col>=0 && col<=2){ start_col = 0 ; end_col = 2; }
      else if(col>=3 && col<=5){ start_col = 3 ; end_col = 5; }
      else                     { start_col = 6 ; end_col = 8; }

  for(i = start_row ; i <= end_row ; i++)
  {
    for(j = start_col ;j <= end_col ; j++)
      if(val == grid[i][j])
        return false;
  }

  return true;
}
//solving method
function find_blank(grid)
{   var i,j;
  for(i=0;i<9;i++)
  {
    for(j=0;j<9;j++)
    {
      if(grid[i][j] == 0 )
        return[i,j,true];
    }
  }
  return [-1,-1,false];
}

function solve_sudoku(grid)
{
  var [i,j,is_b]=[0,0,false];
  [i,j,is_b]=find_blank(grid);
    
    if(is_b == false)
      return true;

    var val;
    for(val=1 ; val <= 9; val++)
    {      
      if( is_safe(grid,i,j,val) == true )
      {  
        grid[i][j] = val;

        if(solve_sudoku(grid))
            return true;

       grid[i][j] = 0;
        }
    
    }
    return false;
}

function main(grid)
{
    var k=solve_sudoku(grid);
    
    if(k==true)
      return true;
   else
    return false;
}


function print_sudoku(grid)
{
  var i,j;
  var sud = new Array();
  for(i=0;i<9;i++)
  {
    sud[i] = new Array();
    for(j=0;j<9;j++)
      sud[i][j] = grid[i][j];
  }

  var x = document.getElementById("level").selectedIndex;
  var lev=document.getElementsByTagName("option")[x].value;
  if(lev=="0")
  	{
  		alert("Select Level");
  		return ;
  	}
  	else if(lev=="1")
  	{
  		var bla = 35; //Math.floor(Math.random() * 6) + 30;
  	}
  	else if(lev=="2")
  	{
  		var bla = 45; //Math.floor(Math.random() * 6) + 45;
  	}
  	else  //lev==3
  	{
  		var bla = Math.floor(Math.random() * 9) + 50;
  	}
    
    var chk = new Array();
    var m,n;
    for(m=0;m<9;m++)
    {
      chk[m] = new Array();
    }

    for(m=0;m<9;m++)
    {
     for(n=0;n<9;n++)
       {  
        chk[m][n] = 0;
       }
     
    }
    
    for (i=0; i<bla; i++)
    {
        while(true)
        {
             x = Math.floor(Math.random() * 9);
             y = Math.floor(Math.random() * 9);

             if(chk[x][y] == 0)
             {
              chk[x][y] = 1;
              sud[x][y] = 0;
              break;
             }
        }
    }
    

    for(i=0;i<9;i++)
    {
      for(j=0;j<9;j++)
      {   
      	if(sud[i][j] !=0)
      	{
          var ii=i.toString();
			    var jj=j.toString();
			    var i_d=ii+jj;
			    document.getElementById(i_d).value = sud[i][j];
			    document.getElementById(i_d).disabled = true;
			    document.getElementById(i_d).style.color = "black";
          document.getElementById(i_d).style.fontSize = "x-large";
      	} 	
      }
    }
    var e = document.getElementById("tab");
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';  
}


function check()
{
	var grid = new Array();
	var i,j;
	for (i=0; i<9; i++)
	{
		grid[i] = new Array();
		for (j=0; j<9; j++)
		{
			var ii=i.toString();
			var jj=j.toString();
			var i_d=ii+jj;
			var n=document.getElementById(i_d);
			
			if (n.value.length==0)
				{
					alert("Complete the Sudoku");
					return ;
				}

				grid[i][j] =n.value;
		}
	
    }
    
	for (i=0; i<9; i++)
	{
		for (j=0; j<9; j++)
		{
			var ii=i.toString();
			var jj=j.toString();
			var i_d=ii+jj;

			if(document.getElementById(i_d).disabled == false)
				{ 
					if(is_place(grid,i,j,grid[i][j]) == false)
						{  
							document.getElementById(i_d).style.color = "red";
							return [false,grid];
						}

				}
    	}
    }
    return [true,grid];
}



function is_place(grid,row,col,val)
{
	var i,j;
	//checking colomn of row
	for(j=0;j<9;j++)
	{
		if(j==col)
			continue;
		if(grid[row][j] == val)
			{
				return false;
      }
	}

	//checking row of a column
	for(i=0;i<9;i++)
	{
		if(i==row)
			continue;
		if(grid[i][col]==val)
			{
		    return false;
      }
	}
	//checking box

	var start_row, end_row;
    var start_col, end_col;
      if(row>=0 && row<=2)     { start_row = 0 ; end_row = 2; }
      else if(row>=3 && row<=5){ start_row = 3 ; end_row = 5; }
      else                     { start_row = 6 ; end_row = 8; }
      if     (col>=0 && col<=2){ start_col = 0 ; end_col = 2; }
      else if(col>=3 && col<=5){ start_col = 3 ; end_col = 5; }
      else                     { start_col = 6 ; end_col = 8; }

  for(i = start_row ; i <= end_row ; i++)
  {
    for(j = start_col ;j <= end_col ; j++)
      {
      	if(i==row && j==col)
      		continue;
      	if(val == grid[i][j])
        {
        	return false;
        }
      }
  }
  return true;
}

function is_correct()
{
	var [res,grid]=check();
	if(res == true)
			print_tab_comp(res,grid);
	else
		print_tab_comp(res,grid);
}

function print_tab_comp(res,grid)
{
	var i,j;
	document.getElementById("sub_but").disabled = true ;
	document.getElementById("sel").disabled = true;
	document.getElementById("solve_build").disabled = true;
	
	for (i=0; i<9; i++)
	{
		for (j=0; j<9; j++)
		{
			var ii=i.toString();
			var jj=j.toString();
			var i_d=ii+jj;

			if(document.getElementById(i_d).disabled == false)
				{ 
					if(res==true)
					{
						document.getElementById(i_d).style.color = "green"; 
					}
					else
					{
						document.getElementById(i_d).style.color = "red";
					}
				}
			document.getElementById(i_d).disabled = true ;
		}

    }
    if(res==true)
		{
			alert(" Correct Solution  congrts..");
		}
	else
		{
			alert(" Incorrct Solution ");
		}
}