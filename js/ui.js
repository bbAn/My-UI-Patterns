
 
/* Button binding */


if(document.querySelector('.input-file')) {
    const inputFileEl = document.querySelector('.input-file input');
    const fileList = document.querySelector('.file-list');
    const fileBtn = document.querySelector('.input-file .btn-input');
    const fileArray = [];

        fileBtn.addEventListener('click', function(e) {
            if (inputFileEl) {
                inputFileEl.click();
            }
        }, false);

        inputFileEl.addEventListener('change', handleFiles, false);

        function handleFiles() {
            const inputFile = this.files; //첨부된 파일들
            // Array.isArray(array); 배열인지 확인하기

            Array.prototype.push.apply(fileArray, inputFile); //첨부된 파일리스트를 배열로 저장

            console.log(fileArray);

            // Array.prototype.forEach.call(inputFile, function(element, i) {
            //     element.addEventListener('click', function() {
            //         //function code
            //     });
            //     console.log(element)
            // });


            //첨부 파일명 ul li 출력
            for(let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i]; //각 순차적 파일 객체
                fileList.innerHTML += '<li> <span>' + file.name + '</span>  <button type="button" class="btn-del"></button></li>';
            }

            // x 버튼 동작
            const btnDel = document.querySelectorAll('.btn-del');
            for(let j = 0; j < btnDel.length; j++) {
                btnDel[j].addEventListener('click', function(e) {
                    var num = btnDel.length;
                    num--;
                    console.log(num);
                    
                    const idx = e.target.parentNode.getAttribute('data-index'); //삭제된 파일 배열 index를 가져옴
                    const tgEl = e.target.parentNode;

                    // fileArray.splice(j, 1);

                    delete fileArray[j]; // 해당 요소에 empty

                    tgEl.parentNode.removeChild(tgEl);


                    if(btnDel.length == 0 ){
                        fileArray = [];
                    }
                });
            }
        }
}

/* drag n drop */
if(document.querySelector('.input-check--custom')) {
    makeDroppable(document.querySelector('.drop-area'), function(files) {
        var output = document.querySelector('.output');
        var dropAreaText = document.querySelectorAll('.drop-area p, .drop-area span');
        output.innerHTML = '';
        for(var i = 0; i < files.length; i++) {
            if(files[i].type.indexOf('image/') === 0) {
            output.innerHTML += '<img src="' + URL.createObjectURL(files[i]) + '" />';
            }
            output.innerHTML += '<div>'+files[i].name+'</div>';
        }
        for(var j = 0; j < dropAreaText.length; j++) {
            dropAreaText[j].style.display = 'none';
        }
    });
}

function triggerCallback(e, callback) {
    if(!callback || typeof callback !== 'function') {
        return;
    }
    var files;
    if(e.dataTransfer) {
        files = e.dataTransfer.files;
    } else if(e.target) {
        files = e.target.files;
    }
    callback.call(null, files);
}

function makeDroppable(ele, callback) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.style.display = 'none';
    input.addEventListener('change', function(e) {
        triggerCallback(e, callback);
    });
    ele.appendChild(input);
    
    ele.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ele.classList.add('dragover');
    });
    
    ele.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ele.classList.remove('dragover');
    });
    
    ele.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ele.classList.remove('dragover');
        triggerCallback(e, callback);
    
    });
    
    ele.addEventListener('click', function() {
        input.value = null;
        input.click();
    });
}