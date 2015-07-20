//board setup
var a = ["_", "_","_","_", "_","_","_", "_","_"]

var disableBox = function(){
  for(var i = 0; i < a.length; i++){
    if(a[i] === "x" || a[i] === "o"){
      $("#" + i).off('click')
    }
  }
}

var checkWinsBlocks = function(letter){
  var regex = new RegExp(letter, 'g')
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
    if(winSum.join("").match(regex) != null){
      if(winSum.join("").match(regex).length === 2 && winSum.indexOf("_") > -1){
        console.log(winSum)
        var placeChange = winStates[i][winSum.indexOf("_")][1]
        $("#" + placeChange).text("o")
        a[placeChange] = "o"
        console.log(placeChange)
        console.log("there's a potetioal win there")
        console.log(i)
        return false
      }
    }
    console.log(winSum)
    console.log(a)
  }
  return true
}

var turn2corners = function(){
  if (a[0] === "x" && a[8] === "x" || a[2] === "x" && a[6] === "x"){
    a[1] = "o"
    $("#1").text("o")
    return false
  } else if((a[1] === "x" && a[7] === "x")|| (a[3] === "x" && a[5] === "x")){
    a[2] = "o"
    $("#2").text("o")
    return false
  } else if(a[1] === "x" && a[3] == "x"){
    a[0] = "o"
    $("#0").text("o")
    return false
  } else if(a[1] === "x" && a[5] == "x"){
    a[2] = "o"
    $("#2").text("o")
    return false
  } else if(a[7] === "x" && a[3] == "x"){
    a[6] = "o"
    $("#6").text("o")
    return false
  } else if(a[7] === "x" && a[5] == "x"){
    a[8] = "o"
    $("#8").text("o")
    return false
  } else {
    if(a[0] === "x" && a[8] === "_"){
      a[8] = "o"
      $("#8").text("o")
      return false
    } else if(a[6] === "x" && a[2] === "_"){
      a[2] = "o"
      $("#2").text("o")
      return false
    } else if(a[2] === "x" && a[6] === "_"){
      a[6] = "o"
      $("#6").text("o")
      return false
    } else if(a[8] === "x" && a[0] === "_"){
      a[0] = "o"
      $("#0").text("o")
      return false
    }
    return true
  }
  return true
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
        if (checkWinsBlocks("o") === true){
          if(checkWinsBlocks("x") === true){
            turn2corners()
          }
        }
      } else if (turn === 2){
        turn += 1
        checkWinsBlocks("o")
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
        if (checkWinsBlocks("x") === true){
          computerPlayEasy(a)
        }

        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
        gameState(a)
        }
      } else if (turn === 3){
        turn += 1
        checkWinsBlocks("o")
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
          if(checkWinsBlocks("x") === true){
              computerPlayEasy(a)
          }
          if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
          gameState(a)
        }
      } else if (turn === 4){
        checkWinsBlocks("o")
        if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        } else {
          checkWinsBlocks("x")
          computerPlayEasy(a)
          if(gameState(a) === "player win" || gameState(a) === "computer win" || gameState(a) === "tie"){
          return
        }
          gameState(a)
        }
      }
    disableBox()
  })
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
    disableBox()
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
      return
    }
    if (turn === "o"){
      turn = "x"
    } else {
      turn = "o"
    }
    disableBox()
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

var game = new Gamesetup(a)
game.render();
