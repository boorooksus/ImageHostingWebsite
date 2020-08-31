var express = require('express');
var router = express.Router();
var auth = require('../lib/auth.js');

router.get('/', function(request, response){
  var authStatusUi = auth.statusUi(request, response);
  var html = `
  <!DOCTYPE html>
  <html>
    <head>
          <meta charset="utf-8">
          <title>main</title>
          <link rel="stylesheet" href="/css/reset.css">
          <link rel="stylesheet" href="/css/style.css">
          <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
          <meta name="viewport" content="width=device-width,initial-scale=1" />

      </head>
      <body>
      <header>
        <div class="overLay" id='overLay'>
        </div>
        <div class="slider" id='slider'>
        <div class="background_01"></div>
        <div class="background_02"></div>
        <div class="background_03"></div>
        <div class="background_04"></div>
        </div>

        <div class="membership" id='membership'>
        ${authStatusUi}
        </div>
        <div class="contents" id="contents">
          <h1 class='contents_name' id='contents_name'>WEB_14</h1>
          <div class='js-clock' id ='js-clock'><h1>00:00</h1></div>
            <div class="contents_searching" id='contents_searching'>
            <form action="/topic/search/1" method="post">
            <input type="text" placeholder="검색어 입력" name="term">
            <button>검색</button>
            </form>
            </div>
            <div class="contents_main">
              <ul class="contents_list">
                <li><a href="/topic/create"><i class="far fa-plus-square"></i></a><div style="color:#fbbc05">add</div></li>
                <li><a href="/topic/browsing/1"><i class="fas fa-list"></i></a><div style="color:#fbbc05">list</div></li>
                <li><a href="/topic/myPage/1"><i class="fas fa-hashtag"></i></a><div style="color:#fbbc05">tag</div></li>
                <li><a href="/auth/modifyingMyInfo"><i class="fas fa-ellipsis-h"></i></a><div style="color:#fbbc05">more</div></li>
              </ul>
            </div>
        </div>
        </header>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="/js/slider.js"></script>
        <script src="/js/clock.js"><h1>00:00</h1></script>
        <script src="https://kit.fontawesome.com/8efa19c011.js" crossorigin="anonymous"></script>
      </body>
  </html>
  `;
  response.send(html);
});

module.exports = router;