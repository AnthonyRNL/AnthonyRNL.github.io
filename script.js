//board setup
var a = ["_", "_","_","_", "_","_","_", "_","_"]
// var b = [{
//   "pool": "table",
//   "nook": "book",
//   "cough": "sick"
//   }] //computer reads


// is flatten even necessary?
// yes, must start as flattened, set value, regroup, check board to see if wins, flatten
// actually, don't need because you can use the group function whenever you check for wins
function flatten(arr) {
  return  arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function regroup(arr) {
  var z = []
  for (i = 0; i < arr.length; i += 3) {
    z.push([arr[i], arr[i+1], arr[i+2]])
  }
  return z
}

function gameState(arr) {
  var q = regroup(arr)

  for(i = 0; i < q.length; i++) {
      if (q[i].join("") === "xxx" ||
      q[0][i] + q[1][i] + q[2][i] === "xxx" ||
      q[0][0] + q[1][1] + q[2][2] === "xxx" ||
      q[0][2] + q[1][1] + q[2][0] === "xxx") {
        console.log("yooooo")
      } else if (q[i].join("") === "ooo" ||
      q[0][i] + q[1][i] + q[2][i] === "ooo" ||
      q[0][0] + q[1][1] + q[2][2] === "ooo" ||
      q[0][2] + q[1][1] + q[2][0] === "ooo") {
        console.log("N0o0ooooo")
      }
  }
  console.log("gameState: " + a)
}

function computerPlay(arr) {
  var sortBlanks = []
  for(var i = 0; i < arr.length; i++) {
    if (arr[i] === "_") {
      sortBlanks.push(i)
    }
  }
  var random = sortBlanks[Math.floor(Math.random()*sortBlanks.length)]
  $("#" + random).text("o")
  arr[random] = "o"
  console.log(arr)
}

// a = flatten(a)
// console.log(a)
// regroup(a)
// console.log(a)

var Gamesetup = function Gamesetup(box) {
  this.box = box
  this.render = function(){
    for (var i = 0; i < this.box.length; i ++){
      var $div = $("<div class='box' id='" + i + "'> ")
      $('.container').append($div)
    }
  }

  $('div').on('click', function (event) {
    boxId = $(event.target).attr('id')
    $("#" + boxId).text("x")
    box[boxId] = "x"
    gameState(box)
    computerPlay(box)
    gameState(box)

  })
}
//
// console.log(regroup(flatten(a)))

// turn constructer function
//collapse the array into
//   generate the squares

//   for each of the squares on click, they need to:
//   record the value on the computer board
//   have the computer read the board and look for a win
//
//
// how to i communicate to the computer reads the positioning of the clicked square?
// set the value of itself equal to x.
// group it by 3 again

var game = new Gamesetup(a)
game.render();
