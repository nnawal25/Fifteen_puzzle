
//globally declared variables 
var gamePiece; 
var notify;
var timer;
var spaceY;
var spaceX;
var moves = 0;
var bestmoves = 0;
var stats = document.getElementById('win');
var start = new Date();
var seconds = 0;
var besttime = 0;
var player = document.getElementById('myAudio');
var winplay = document.getElementById('winSound');


 window.onload = function ()

{

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); //gets the puzzle area

	for (var i=0; i<gamePiece.length; i++) //goes through and looks at each puzzle piece

	{

		gamePiece[i].className = 'puzzlepiece'; 

		gamePiece[i].style.left = (i%4*100)+'px'; //calculates the position for puzzle pieces from the left of the screen

		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; //calculates the position for puzzle pieces from the top of the screen

		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top; 
		//calculates the position of the background picture so it moves with the puzzle pieces


        gamePiece[i].style.backgroundImage="url('https://codd.cs.gsu.edu/~alomini1/WP/PW/PW2/images/smiley.gif')"; //load default image at startup
		gamePiece[i].onmouseover = function()

		{
            
    
			if (checkMove(parseInt(this.innerHTML))) //checks whenever a move is made

			{
				//Changes the styling of a piece that can be moved
				this.style.border = "3px solid red"; 

				this.style.color = "#006600"; 

				this.style.textDecoration = "underline"; 

                

			}

		};


		gamePiece[i].onmouseout = function() //activates whenever mouse moves out of puzzle piece

		{

			this.style.border = "2px solid black"; //reverts to its original size border 

			this.style.color = "#000000"; //reverts to original text color

			this.style.textDecoration = "none"; //reverts the text to its original style

		};



		gamePiece[i].onclick = function() //activates when mouse clicks on a puzzle piece

		{

			if (checkMove(parseInt(this.innerHTML))) //checks whether or not the puzzle piece can move into an empty space

			{
				swap(this.innerHTML-1); //moves into an empty space if true


				if (finish())

				{

					win();

				}

				return;

			}

		};

	}


	var shuffle = document.getElementById('shuffler'); //initializes the shuffle button

	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() //activates whenever the shuffle button is clicked

	{

		for (var i=0; i<1000; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY); 

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY);

				if ( temp != -1) 

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}
		moves = 0; // sets moves back to 0 after shuffling
		stats.innerText="";
		seconds = 0;
		start = new Date();
		bgaudio();
	};

};

function select_background() // change to chosen image
{ 
	var image = document.getElementById("characters");
	var value = image.options[image.selectedIndex].value;
	for (var i=0; i<gamePiece.length; i++){
	gamePiece[i].style.backgroundImage=value;
	}
}

function checkMove(position) // checks if there is an empty space for a piece to be moved into
{

	if (left(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position-1))

	{

		return true;

	}

}




function Notify() //notifies the user 

{

	notify --; //decrements the value of 

	if (notify == 0) //if the value reaches the end then

	{

		var body = document.getElementsByTagName('body'); //retrieves body element in html

		body[0].style.backgroundImage= "none"; //reverts to original page background

		alert('Winner! ... Shuffle and Play Again'); //tells the user that they have won the game 

		var para=document.getElementsByClassName('explanation');
	    para[0].style.visibility="visible"; //reverts visiblity to its original state

		return;

	}

	else  (notify % 2) 

	{

		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~alomini1/WP/PW/PW2/images/win.gif')"; //change the background 
	    
		
	}

    timer= setTimeout(Notify, 50); //notifies the user for 5 seconds
}



function win() //tells the player they have won

{

	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('https://codd.cs.gsu.edu/~alomini1/WP/PW/PW2/images/win.gif')";

	notify = 10; //initializes notify variable

	timer= setTimeout(Notify, 100);

	console.log(moves);

	var end = new Date();
	var elapsed_ms = end - start;
	var seconds = Math.round(elapsed_ms/1000);


	if(bestmoves == 0){
		bestmoves = moves;
	}else if(moves < bestmoves){
		bestmoves = moves;
	}
	
	console.log(seconds);

	if(besttime == 0){
		besttime = seconds;
	}else if(seconds < besttime){
		besttime = seconds;
	}

	var wintext = "Your Total Moves: " + moves +"\n Time Taken: " + seconds + " Seconds" + "\n Best Moves: " + bestmoves + "\n Best Time: " + besttime + " Seconds";

	stats.innerText = wintext;
	moves = 0;
	seconds = 0;
	start = new Date();
	player.pause();
	winplay.play();
}

function bgaudio(){
	player.play();
}


function finish()  //checks when the all the 15 pieces are in its right space

{

	var flag = true;

	for (var i = 0; i < gamePiece.length; i++) //for each puzzle piece 
	{

		var top = parseInt(gamePiece[i].style.top);

		var left = parseInt(gamePiece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if each piece matches its left and top position

		{

			flag = false;

			break;

		}

	}

	return flag;

}



function left(x, y) //calculates how far to the left a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < gamePiece.length; i++) 

		{

			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

			{

				return i;

			} 

		}

	}

	else 

	{

		return -1;

	}

}



function right (x, y) //calculates how far to the right a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<gamePiece.length; i++){

			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function up(x, y) //calculates how far up a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		} 

	}

	else 

	{

		return -1;

	}

}



function down (x, y) //calculates how far down a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<gamePiece.length; i++)

		{

			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function swap (position) //moves the puzzle piece by switching position with an empty space
{

	var temp = gamePiece[position].style.top;

	gamePiece[position].style.top = spaceY;

	spaceY = temp;

	temp = gamePiece[position].style.left;

	gamePiece[position].style.left = spaceX;

	spaceX = temp;

	moves++;

	//console.log(moves);
	console.log(seconds);

}

console.log(seconds);