# madproj2
# BBi-BBi

---

> Flow Week2 2분반 팀1
> 
- 정보 과부하의 시대에, 느림의 미학(美學)과 낭만을 추구한 “삐삐” 어플리케이션입니다.
- 친구들의 이름과 닉네임을 저장하고, 해당 계정으로 삐삐 문자 쌍방 통신이 가능합니다.
- 카카오톡 계정을 이용하여 로그인이 가능합니다.
- 친구들과 문자를 주고 받은 채팅방을 확인하고, 열람할 수 있습니다.
- 삐삐 문자 (숫자 코드) 전송 의미를 명시한 사전 탭이 있습니다.

![Untitled](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/519d5afb-41bf-4d16-bad5-a72910ca0c8d)

---

## **A. 개발 팀원**

- 박진아 (https://github.com/pja9362)
- 허도영 (https://github.com/dyheo619)

---

## **B. 개발 환경**

- Device OS : Android
- Front-end : React Native, Redux
- Back-end : Node.js express
- Target Device: Galaxy Quantum 2

---

## **C. 어플리케이션 소개**

### **TAB - Login**

![Untitled 1](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/a6069eb5-280b-4d82-b47b-c07be66dac9b)


**Major features**

- 카카오톡 계정 / 앱에서 만든 계정을 이용하여 두 가지 방법으로 로그인이 가능합니다.
- 카카오톡의 경우, 카카오톡 API를 불러와서 로그인이 가능하도록 설정했습니다.
- 카카오톡으로 로그인을 하게 되는 경우, 카카오톡 계정 이름 + “삐삐”로 닉네임이 설정됩니다.
- 카카오톡 로그인 시, 뜨는 영어로 된 창의 Yes를 눌러야 로그인이 됩니다.

---

### **TAB - Signup**

![Untitled 2](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/f4d355cc-951d-4322-ae72-d0f8a72be92e)


**Major features**

- 앱에서 계정을 만들 수 있게 해 주는, 회원 가입 창입니다.
- 닉네임(아이디) 와 비밀번호를 입력하여, 등록이 가능합니다.
- MongoDB를 베이스로, POST 쿼리를 통해 DB에 해당 정보를 업로드 할 수 있도록 되어 있습니다.

---

### **TAB - BBi BBi Send**

![Untitled 3](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/87563de9-45bc-4b8d-a3d8-2b702d70f013)


**Major features**

- 화면 하단 가운데 버튼을 누르면 삐삐를 보낼 수 있습니다.
- 보내고 싶은 사람의 닉네임을 입력하고, 문자를 보낼 수 있습니다(숫자로만)
- 상대방에게 삐삐가 전송되면, 알림음이 상대방 휴대폰에서 울립니다.
- Contact 탭에 추가되어 있지 않은 친구에게도, 닉네임을 알고 있으면 전송이 가능합니다.
- TAB - Signup과 마찬가지로, 전송시 POST 쿼리를 통해서 DB에 메시지 정보를 업로드 합니다.

---

### **TAB - Contact**

![Untitled 4](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/45b479b3-338b-4a2a-9aa0-c46055a750e2)


**Major features**

- 친구를 추가하고, 삭제할 수 있는 페이지 입니다.
- DB에 업로드 되어있는 (회원가입 전적이 있는) 친구만 추가가 가능합니다.

---

### **TAB - History**


![Untitled 5](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/5ee8e579-c1cb-462d-beac-280bc3e7149b)

**Major features**

- 카카오톡 기능처럼, 삐삐를 나눈 친구들과의 채팅방 목록 및 대화 내역을 확인할 수 있습니다.
- 상대방의 이름, 닉네임, 마지막 메시지가 표시됩니다.

---

### **TAB - BBiBBi**

![Untitled 6](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/5c4e3fb7-2ee9-4f60-99c1-209bc61699d3)


**Major features**

- 삐삐를 사용하는 유저들에게 삐삐를 보낼 수 있습니다.
- 사용해본 적은 없지만, 보다 실감나는 삐삐 사용을 위해 ‘삐삐 UI’를 구현했습니다.
- 삐삐를 받는 사용자에게는 알림소리와 함께 푸시 알림이 표시되며, 푸시 알림을 클릭하면 메시지가 표시된 삐삐 UI를 확인할 수 있습니다.
- 단, 메시지는 모두 “숫자” 로만 이루어져 있습니다.

---

### **TAB - Dictionary**

![Untitled 7](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/dd2ab983-51c3-4aac-8496-55e86c7786ba)


**Major features**

- 삐삐를 사용해본 적 없는 세대를 위한 삐삐 용어 모음집을 제공합니다.
- 통신공학에서의 Encoding과 Decoding의 원리가 가장 원초적이고, 적절히 이용된 사례입니다.
- 문자를 보내지 못하고, 오직 숫자의 배열에서만 느낄 수 있는 그 시대의 감성이 있습니다.
- 10진수 숫자의 조합으로, 수많은 표현이 가능했던 조상들(X세대)의 지혜가 엿보입니다.

---

### **TAB - My page**

![Untitled 8](https://github.com/2023-MadCamp-2/madproj2/assets/33695380/e864394b-cad4-48be-a726-c2fcad362986)

**Major features**

- 나의 정보를 열람할 수 있습니다.
- 원하는 레트로 감성의 프로필 사진을 주사위를 굴려 선택이 가능합니다.
