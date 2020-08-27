var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');


router.get('/login', (request, response) => {
    var html = `        
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/style-login.css">
        </head>
        <body>
        <form action="/auth/login_process" method="post">
            <div>
            <h1>
                Welcome!
            </h1>
            </div>
            <div>
            <input id="idn" type="text" name="id" placeholder="ID">
            </div>
            <div>
            <input id="pwd" type="password" name="password" placeholder="Password">
            </div>
            <div>
            <button type="submit">Login</button>
            </div>
            <div id="cbw">
            <label>
                <input id="cb" type="checkbox" name="size">로그인 상태 유지
            </label>
            </div>
            <div id="a">
            <a href="inha2.html" target="_blank">아이디 찾기</a>
            <a href="inha3.html" target="_blank">비밀번호 찾기</a>
            <a href="https://haha/joining.php">회원가입</a>
            </div>
        </form>
        </body>
        </html>
    `;
    response.send(html);
});

router.get('/logout', (request, response) => {
    request.session.destroy(function(err){
        response.redirect('/');
    });
})

router.post('/login_process', (request, response)=>{
    var post = request.body;
    console.log('id: ', post.id);
    db.query(`SELECT * FROM user WHERE id = '${post.id}'`,(err, res) => {
        if(err){
            throw(err);
        }
        else if(res.length === 0){
            console.log('id not found');
            response.send('login failed');
        }
        else if(res[0].password !== `${post.password}`){
            console.log('===password is not correct===');
            console.log('post.password: ', post.password);
            console.log('input: ', res[0].password);
            response.send('login failed');
        }
        else{
            request.session.is_logined = true;
            request.session.nickname = post.id;
            // session 객체의 데이터를 session store에 반영.
            request.session.save(function(){
                // call back 함수로 메인 페이지로 redirection하게 해서 session 저장 작업이 끝난 후에 수행하게함. 이렇게 안하면 session 저장이 끝나기 전에 redirection이 되서 로그인 안된 채로 메인화면으로 갈 수도 있음
                response.redirect(302, `/`);
            });
        }
    })
})

router.get('/join', (request, response) => {
    var html = `     
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/style-signup.css">
        <script src="/js.script-signup.js"></script>
        <title>SignUp</title>
    </head>
    
    <body>
        <h6 id="signUp"><a href="SignUp.html">회원 가입</a></h6>
        <img src="#" alt="Add Image" width="1000px" height="350px">
        <h4 class="title">회원 가입</h4>
        <div id="grid">
            <ul>
                <li>전체 글 보기</li>
                <br>
                <li>게시판1</li>
                <li>게시판2</li>
                <li>게시판3</li>
                <li>게시판4</li>
            </ul>
            <div id="inputInfo">
                <table>
                    <tr>
                        <td>아이디</td>
                        <td><input type="text" id="id" class="text" placeholder="아이디" onfocus="removeBlur(this)"
                                onblur="blur(this)"></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" id="password" class="text" placeholder="비밀번호(숫자, 영어조합 10자 이상)"
                                onfocus="removeBlur(this)" onblur="blur(this)" onkeyup="Judge.correct(this)"></td>
                    </tr>
                </table>
                <p id="judgement_1"></p>
                <table>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td><input type="password" id="pass_check" class="text" placeholder="비밀번호 확인"
                                onfocus="removeBlur(this)" onblur="blur(this)" onkeyup="Judge.same(this)"></td>
                    </tr>
                </table>
                <p id="judgement_2"></p>
                <table>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" id="name" class="text" onfocus="removeBlur(this)" placeholder="이름"
                                onblur="blur(this)">
                        </td>
                    </tr>
                    <tr>
                        <td>생년월일</td>
                        <td><input type="date" id="birth" class="text" onfocus="removeBlur(this)" onblur="blur(this)"></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="email" id="email" class="text" onfocus="removeBlur(this)" placeholder="이메일"
                                onblur="blur(this)"></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>성별</td>
                        <td><input type="button" id="male" value="남" onclick="gender(this, '#female')"></td>
                        <td><input type="button" id="female" value="여" onclick="gender(this, '#male')"></td>
                    </tr>
                </table>
                <br>
                <br>
                <br>
                <input class="btn_submit" type="submit" value="회원가입" onclick="Judge.blank()">
            </div>
        </div>
    
    </body>
    
    </html>
    `;
    response.send(html);
});

module.exports = router;