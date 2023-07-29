  //공용 오류정보 표시
const join = document.querySelector(".join_row")    //공용 div
const $id = document.querySelector("#id") //아이디
const idbox = document.querySelector('#ID') //아이디 박스

const $input_1 = document.querySelector("#pass")    //비밀번호
const lock1 = document.querySelector("#lock_1") //자물쇠 이미지
const block_1 = document.querySelector("#PWD")  //비밀번호 칸을 감싼 div
const $input_2 = document.querySelector('#pass_check')  //비밀번호 확인칸
const lock2 = document.querySelector('#lock_2') //자물쇠 이미지
const block_2 = document.querySelector('#PWD_CHECK')    //비밀번호 확인칸을 감싼 div

const $name = document.querySelector('#name')   //이름
const namebox = document.querySelector('#NAME')

const $yy = document.querySelector('#yy')   //생년
const $mm = document.querySelector('#mm')    //생월
const $dd = document.querySelector('#dd')   //생일
const $birthbox = document.querySelector('.birth') //생일 박스

function ID(event){
    const error = document.querySelector(".error_next_box")
    if(!$id.value){
        
        error.textContent = '필수 정보입니다.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        idbox.appendChild(error)
    }
}
function NAME(event){
    const error = document.querySelector("#ID .error_next_box")
    if(!$name.value){
        error.textContent = '필수 정보입니다.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        namebox.appendChild(error)
    }
}
function PWD(event){    //비밀번호 입력
    const error = document.querySelector("#PWD .error_next_box")
    let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!$input_1.value){    //공란 시 작동
        
        lock1.style.backgroundPosition = "25% 50%"
        error.textContent = '필수 정보입니다.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        block_1.appendChild(error)
    } 
    else if(reg.test(event.target.value) === false){    //조건 불일치 시 작동
        lock1.style.backgroundPosition = "25% 50%"
        error.textContent = '8~16자, 특수문자를 1개 이상 포함하세요.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        block_1.appendChild(error)
    }
    else {  //맞으면 작동
        error.remove()
        lock1.style.backgroundPosition = "80% 0%"
    }
}

function CHECK(event){  //비밀번호 재확인
    const error = document.querySelector("#PASS_CHECK .error_next_box")
    if($input_1.value == $input_2.value){   //값이 일치하면
        text2.remove()
        lock2.style.backgroundPosition = "80% 0%"
    }
    else {  //아니면
        lock2.style.backgroundPosition = "25% 50%"
        text2.textContent = '비밀번호가 일치하지 않습니다.'
        text2.style.fontSize = '12px'
        text2.style.textAlign = 'left'
        text2.style.marginLeft = '8px'
        text2.style.color = 'red'
        block_2.appendChild(text2)
    }
}

function BIRTH(event){
    const error = document.querySelector(".birth .error_next_box")
    if(!$yy.value){
        error.textContent = '태어난 연도를 입력해주세요.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        birthbox.appendChild(error)
    }
    else if(!$mm.value){
        error.textContent = '월을 선택해주세요.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        birthbox.appendChild(error)
    }
    
    else if(!$dd.value){
        error.textContent = '태어난 일을 입력해주세요.'
        error.style.fontSize = '12px'
        error.style.textAlign = 'left'
        error.style.marginTop = '8px'
        error.style.color = 'red'
        birthbox.appendChild(error)
    }

    else {
        error.remove()
    }
}
$input_1.addEventListener("blur", PWD)  //blur: 다른곳으로 이동했을때
$input_2.addEventListener("change", CHECK)  //변화시
$id.addEventListener("blur", ID)    
$name.addEventListener("blur", NAME)
$yy.addEventListener("blur", BIRTH)
$mm.addEventListener("blur", BIRTH)
$dd.addEventListener("blur", BIRTH)