//board setup
var a = ["_", "_","_","_", "_","_","_", "_","_"]

var checkBlocks = function(){
  var diagL = [[a[0], 0], [a[4], 4], [a[8], 8]]
  var diagR =  [[a[2],2], [a[4],4], [a[6],6]]
  var column1 = [[a[0],0], [a[3],3], [a[6],6]]
  var column2 = [[a[1],1], [a[4],4], [a[7],7]]
  var column3 = [[a[2],2], [a[5],5], [a[8],8]]
  var row1 = [[a[0],0], [a[1],1], [a[2],2]]
  var row2 = [[a[3],3], [a[4],4], [a[5],5]]
  var row3 = [[a[6],6], [a[7],7], [a[8],8]]
  var winStates = [diagL, diagR, column1, column2, column3, row1, row2, row3]
  for(var i = 0; i < winStates.length; i++){
    var winSum = []
    winStates[i].forEach(function(e){
      winSum.push(e[0])
    })
    if(winSum.join("").match(/[x]/g) != null){
      if(winSum.join("").match(/[x]/g).length === 2 && winSum.indexOf("_") > -1){
        console.log(winSum)
        var placeChange = winStates[i][winSum.indexOf("_")][1]
        $("#" + placeChange).text("o")
        a[placeChange] = "o"
        console.log(placeChange)
        console.log("there's a potetioal block there")
        console.log(i)
      }
    }
    console.log(winSum)
    console.log(a)
  }
}
var checkWins = function(){
  var diagL = [[a[0], 0], [a[4], 4], [a[8], 8]]
  var diagR =  [[a[2],2], [a[4],4], [a[6],6]]
  var column1 = [[a[0],0], [a[3],3], [a[6],6]]
  var column2 = [[a[1],1], [a[4],4], [a[7],7]]
  var column3 = [[a[2],2], [a[5],5], [a[8],8]]
  var row1 = [[a[0],0], [a[1],1], [a[2],2]]
  var row2 = [[a[3],3], [a[4],4], [a[5],5]]
  var row3 = [[a[6],6], [a[7],7], [a[8],8]]
  var winStates = [diagL, diagR, column1, column2, column3, row1, row2, row3]
  for(var i = 0; i < winStates.length; i++){
    var winSum = []
    winStates[i].forEach(function(e){
      winSum.push(e[0])
    })
    if(winSum.join("").match(/[o]/g) != null){
      if(winSum.join("").match(/[o]/g).length === 2 && winSum.indexOf("_") > -1){
        console.log(winSum)
        var placeChange = winStates[i][winSum.indexOf("_")][1]
        $("#" + placeChange).text("o")
        a[placeChange] = "o"
        console.log(placeChange)
        console.log("there's a potetioal win there")
        console.log(i)
      }
    }
    console.log(winSum)
    console.log(a)
  }
}

var hardPlay = function(){
  var turn = 0
  var diags = [a[0], a[2], a[6], a[8]]



  $('.box').on('click', function (event) {
    boxId = $(event.target).attr('id')
    console.log(event)
    $("#" + boxId).text("x")
    a[boxId] = "x"
    gameState(a)
      if(turn === 0){
        turn += 1
         if (a[4]==="x" && diags.indexOf("o") === -1){
           a[2] = "o"
           $("#2").text("o")
         } else {
           a[4] = "o"
           $("#4").text("o")
         }
      } else if(turn === 1){
        turn += 1
        checkWins()
        checkBlocks()
        if (a[0] === "x" && a[8] === "x" || a[2] === "x" && a[6] === "x"){
          a[1] = "o"
          $("#1").text("o")
        } else if((a[1] === "x" && a[7] === "x")|| (a[3] === "x" && a[5] === "x")){
          a[2] = "o"
          $("#2").text("o")
        } else {
          if(a[0] === "x" && a[8] === "_"){
            a[8] = "o"
            $("#8").text("o")
          } else if(a[6] === "x" && a[2] === "_"){
            a[2] = "o"
            $("#2").text("o")
          } else if(a[2] === "x" && a[6] === "_"){
            a[6] = "o"
            $("#6").text("o")
          } else if(a[8] === "x" && a[0] === "_"){
            a[0] = "o"
            $("#0").text("o")
          }
        }
      } else if (turn === 2){
        turn += 1
        checkWins()
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
        checkBlocks()
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
        gameState(a)
        }
      } else if (turn === 3){
        turn += 1
        checkWins()
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
          checkBlocks()
          if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
          gameState(a)
        }
      } else if (turn === 4){
        checkWins()
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
          checkBlocks()
          if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
          gameState(a)
        }
      }
  })
}


function regroup(arr) {
  var z = []
  for (i = 0; i < arr.length; i += 3) {
    z.push([arr[i], arr[i+1], arr[i+2]])
  }
  return z
}

function flatten(arr) {
  return  arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}


function gameState(arr) {
  var q = regroup(arr)

  for(i = 0; i < q.length; i++) {
      if (q[i].join("") === "xxx" ||
        q[0][i] + q[1][i] + q[2][i] === "xxx" ||
        q[0][0] + q[1][1] + q[2][2] === "xxx" ||
        q[0][2] + q[1][1] + q[2][0] === "xxx") {
          console.log("yooooo")
          $('span').text("X WINNNNs")
          $('.container')[0].style["opacity"] = "0.6"
          $('#modal').show()
          return "player win"
      } else if (q[i].join("") === "ooo" ||
      q[0][i] + q[1][i] + q[2][i] === "ooo" ||
      q[0][0] + q[1][1] + q[2][2] === "ooo" ||
      q[0][2] + q[1][1] + q[2][0] === "ooo") {
        console.log("N0o0ooooo")
        $('span').text("O WInnnss")
        $('.container')[0].style["opacity"] = "0.6"
        $('#modal').show()
        return "computer win"
      } else if (a.indexOf("_") === -1) {
      console.log("This is a tie!")
      $('span').text("You TIIEEEEE")
      $('.container')[0].style["opacity"] = "0.6"
      $('#modal').show()
      return "tie"
    }
  }
}


function computerPlayEasy(arr) {
  var sortBlanks = []
  for(var i = 0; i < arr.length; i++) {
    if (a[i] === "_") {
      sortBlanks.push(i)
    }
  }
  var random = sortBlanks[Math.floor(Math.random()*sortBlanks.length)]
  $("#" + random).text("o")
  a[random] = "o"
  // console.log(sortBlanks)
  // console.log(arr)


}




var onePlayerGame = function(arr){
  $('.box').on('click', function (event) {
    boxId = $(event.target).attr('id')
    console.log(event)
    $("#" + boxId).text("x")
    a[boxId] = "x"
    if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){

      return
    } else {
      computerPlayEasy(a)
      gameState(a)
    }
    console.log("gameState: " + a)
  })

}



var twoPlayerGame = function(arr){
  var turn = "x"

  $('.box').on('click', function (event) {
    boxId = $(event.target).attr('id')
    $("#" + boxId).text(turn)
    a[boxId] = turn
    console.log("gameState: " + a)
    console.log(gameState(a))
    if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
      // $('.box').off('click')
      return
    }
    if (turn === "o"){
      turn = "x"
    } else {
      turn = "o"
    }
  })
}

var playChoice = ""
var Gamesetup = function Gamesetup(box) {
  this.box = box
  this.render = function(){
    for (var i = 0; i < this.box.length; i ++){
      var $div = $("<div class='box' id='" + i + "'> ")
      $('.container').append($div)
    }
    $('.reset').on('click', function(e){
      window.location.reload()
    })
    $('#modal-reset').on('click', function(e){
      a = ["_", "_","_","_", "_","_","_", "_","_"]
      $('.box').text("")
      $('#modal').hide()
      $('.container')[0].style["opacity"] = "1"

      if($('input[name=choice]:checked').val() === "3"){
        $('.box').off('click')
        hardPlay()
      }
    })

  $('input').on('click', function(e){
    a = ["_", "_","_","_", "_","_","_", "_","_"]
    $('.box').text("")
    playChoice = $('input[name=choice]:checked').val()
    console.log(playChoice)

    if (playChoice === "1"){
      $('.box').off('click')
        twoPlayerGame(a)
      } else if (playChoice === "2") {
        $('.box').off('click')
          onePlayerGame(a)
      } else if (playChoice === "3"){
        $('.box').off('click')
        hardPlay()
      }
    })
  }
 console.log(playChoice)
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
