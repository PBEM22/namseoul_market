// API 키
const apiKey = 'AIzaSyDUWuLQOLhozOMxApmhmq7tVl1WOSLL4iA'; // Replace with your actual API key

// 페이지 로드 시 실행되는 함수
function initialize() {
  // 파일 입력 상자와 이미지 미리보기 요소 가져오기
  const fileInput = document.getElementById('file-input');
  const imagePreview = document.getElementById('image-preview');

  // 파일 입력 상자 이벤트 리스너 등록
  fileInput.addEventListener('change', handleFileInputChange);

  // 파일 입력 상자 변경 이벤트 처리 함수
  function handleFileInputChange(event) {
    const file = event.target.files[0];

    // 이미지 파일인지 확인
    if (file.type.startsWith('image/')) {
      // 이미지 미리보기 업데이트
      const reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
      };
      reader.readAsDataURL(file);

      // 이미지 주석 처리
      annotateImage(file);
    }
  }

  // 이미지 파일의 주석을 요청하는 함수
  function annotateImage(file) {
    // 이미지 파일을 Base64로 인코딩
    const reader = new FileReader();
    reader.onloadend = function (event) {
      const base64Data = event.target.result.split(',')[1];

      // API 요청 생성
      const apiEndpoint = 'https://vision.googleapis.com/v1/images:annotate';
      const request = {
        requests: [
          {
            image: {
              content: base64Data
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5
              }
            ]
          }
        ]
      };

      // API 요청 보내기
      fetch(apiEndpoint + '?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
        .then(response => response.json())
        .then(data => {
          // 결과 처리
          const labels = data.responses[0].labelAnnotations;
          const labelNames = labels.map(label => label.description);

          const item = labelNames.join();
          const qr_url = `https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=${item}`;

          // 결과 출력
          document.getElementById('result').textContent = 'Image labels: ' + labelNames.join(', ');

          // 버튼 추가
          const button = document.createElement('button');
          button.textContent = 'Go to QR Code';
          button.addEventListener('click', () => {
            window.location.href = qr_url;
          });
          document.body.appendChild(button);
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    };
    reader.readAsDataURL(file);
  }
}

// 페이지 로드 시 initialize 함수 호출
window.addEventListener('load', initialize);