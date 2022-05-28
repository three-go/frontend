<img width="200" alt="logo" src="https://user-images.githubusercontent.com/54696956/170207121-5bfe9dac-935f-49af-bc15-38992c199b2c.png">

# ThreeGo

### 설치 및 게임 설명

#### 설치

- ThreeGo는 <b>App Store(for ios), Play Store(for android)</b>에 모두 출시되었습니다. 각 스토어에서 "ThreeGo" 검색 후 다운로드 받을 수 있습니다.
- 다운로드 후에 카메라 권한과 마이크 권한 허용 후 게임을 진행할 수 있습니다.

<img width="200" alt="logo" src="https://user-images.githubusercontent.com/54696956/170207803-e7d2c609-5ef9-4fba-942f-1902ee4afce9.jpg">&nbsp;&nbsp;&nbsp;&nbsp;
<img width="200" height="390" alt="logo" src="https://user-images.githubusercontent.com/54696956/170207833-c58ac3f1-000b-47c0-9b67-a3136dc22bf4.jpg">
<br><br>

#### 게임설명

ThreeGo는 눈의 위치 , 데시벨을 이용하여 FACE GO , SHOUT GO 라는 2가지
미니게임을 즐길 수 있는 어플리케이션 입니다.

- FACE GO  
  총 3개의 스테이지로 구성되어 있으며 5초동안 공개되는 미로맵의 탈출경로를 기억한 뒤 정해진 시간 안에서 얼굴을 상하로 움직이고 좌우로 돌려 캐릭터의 움직임을 기록합니다. 이후 해당 기록대로 캐릭터가 움직이는 결과 확인 단계로 진행됩니다. 이동한 횟수 + 장애물이나 , 맵을 벗어난 이동은 Score를 차감시킵니다. 기회는 총 4번 주어지며 모든 스테이지 통과시 이름과 점수를 등록해 결과를 남길 수 있습니다.

- SHOUT GO  
  몰려오는 상어를 피해 최대한 오랫동안 살아 남아야 하는 미니 게임으로 소리를 내어 통해 위로 이동할 수 있으며 소리를 내지 않는다면 아래로 떨어지게 됩니다. Score는 게임 진행시간에 비례해 증가합니다. 기회는 총 4번이 주어집니다. FACE GO와 마찬가지로 모든 기회 소진시 이름과 점수를 등록해 기록합니다.

<img width="200" height="390" alt="logo" src="https://user-images.githubusercontent.com/54696956/170681855-c65d787b-82ba-480f-b987-0a7659645e01.gif">&nbsp;&nbsp;&nbsp;&nbsp;
<img width="200" height="390" alt="logo" src="https://user-images.githubusercontent.com/54696956/170686314-0b4566e7-ebb0-4981-b65b-90b2bbcc5f10.gif">

### 프로젝트 동기

일상생활에서 매일 모바일을 사용하지만 그동안 앱 개발에 대한 경험이 없었습니다. 웹 환경이 아닌 앱 환경에 도전해보며 앱 환경을 이해해보는 시간을 갖기 위해 단기 프로젝트를 진행했습니다. React-Native라는 새로운 환경 그리고 게임이라는 새로운 장르에 도전하며 그동안 겸험하지 못했던 것들에 직접 부딪혀보고 싶었습니다.
단순 게임이 아닌 재밌는 아이디어와 함께 게임을 컨트롤 할 수 있는 방법을 고민해보았고, 얼굴 인식 데이터를 방향으로 변환하여 맵을 탈출하고, 소리의 데시벨 데이터를 사용하여 캐릭터를 컨트롤 하여 장애물을 피하는 게임을 기획하였습니다.
현업에서는 React-Native Expo가 아닌 CLI로 작업을 한다고 하였고, Expo의 장단점을 찾아보면서 CLI로 도전해보고 싶었습니다. Expo를 사용하면 Expo SDK에서 지원해주는 기능이 많고 간단하게 사용할 수 있기 때문에 빠르고 쉽게 개발할 수 있습니다. 하지만 Native Module과 연결하여 커스터마이징 할 수 없다는 단점과, 빌드할때 유료를 사용하지 않거나, 자체 빌드 서버가 없다면 빌드 큐에서 순서를 기다려야 한다는 단점이 존재합니다. 긴 빌드 시간과 Expo가 자체적으로 제공하는 기능이 많기 때문에 큰 용량 또한 단점이 되어 현업에서는 사용하지 않는다고 합니다. 따라서 Expo가 아닌 CLI로 개발을 진행하면서 직접 환경 설정, 빌드 등 모든 환경에 대한 경험을 해보고자 프로젝트를 기획하게 되었습니다.

### 기술

- Storage
  - React Native Async Storage
    ```
    게임에 저장되는 데이터는 이름, 스코어 2가지 이며 새로운 이름과 스코어를 등록하는 기능, 점수기록 전체를 불러오는 기능이 필요했습니다.Async Storage, Realm, SQLite 중 저장 데이터의 양이 적은상태(100건 미만)에서 저장 및 전체불러오기 속도가 빠른 AsyncStorage를 사용하였습니다.
    ```
- Navigation
  - React Native Navigation
  - React Native Stack
  - React Native Gesture Handler
  - React Native Safe Area Context
  - React Native Screens
    ```
    공식문서의 예시에 나온 네비게이션을 사용했습니다. 의존성있는 라이브러리들을 함께 설치해 화면전환을 구성했습니다
    ```
- Game

  - React Native Permissions

    ```
    애플리케이션은 사용자를 보호하기 위해 사용자의 카메라, 마이크, 위치 등에 직접 액세스할 수 없어야 합니다. 그래서 애플리케이션을 구동하기 위해서는 사용자가 권한을 부여해야 합니다. ThreeGo 게임에서는 사용자의 카메라, 오디오 권한이 필요하기 때문에 권한을 조금 더 쉽게 얻기 위해서 해당 라이브러리를 사용하였습니다.

    ios 권한 인증 flow[사진첨부]
    android 권한 인증 flow[사진첨부]
    ```

  - React Native Camera
    ```
    FaceGo 게임에서 사용자의 얼굴을 활용하여 캐릭터의 움직임을 기록하기 때문에 모바일에서 카메라에 접근 및 사용자의 얼굴의 위치, 각도를 알기 위해서 해당 라이브러리에 포함되어있는 얼굴 인식 기능을 사용하기 위해서 해당 라이브러를 선택하였습니다.
    ```
  - React Native Game Engine
    ```
    소수의 엔터티와 간단한 물리학이 포함된 간단한 턴 기반 게임에 적합합니다. ShoutGo 게임은 React Native Game Engine에서 위 인용문처럼 소수의 엔티티와 간단한 물리학 게임에 사용이 적합하다고 생각하였습니다. 그리고 Component Entity 시스템을 통하여 각 게임의 개체들을 컴포넌트화 하여 조금 더 쉽게 개발할 수 있는 구조이여서 선택하게 되었습니다.
    ```
  - Matter Js
    ```
    React native game engine을 사용하기 위해서Matter.js를 설치해 엔진 , 월드, 게임 내 오브젝트의 세팅을 구성해야 하며 많은 부분을 쉽게 추상화 시켜놓은 상태이므로 필요한 부분을 적절히 사용하였습니다
    ```
  - React Natice Sound Level
    ```
    React Native Sound 라이브러리가 안정화되어있고 많은 기능을 제공하지만 React Native Sound Level를 사용한 이유는 해당 애플리케이션을 구동하기 위한 최소한의 기능이 있고 라이브러리 용량도 50%정도 작아서 더 효율적으로 사용하기위해 선택하였습니다.
    ```

- Animation
  - React Native Reanimated
    ```
    RN에서 제공하는 Animated의 Animated API를 사용하면 애니메이션을 개산할 때 UI Thread와 JS Thread의 비동기 통신에 의존해야하는 반면, Reanimated는 모든 로직을 UI Thread에서 실행하기 때문에 JS Thread의 무거운 작업으로 병목현상이 발생해도 frame drop 없이 애니메이션을 실행할 수 있습니다.
    ```
- ETC
  |ETC||||
  |------|---|---|---|
  |Context Api|React Native Vector Icons|React Native Sound|React Native Splash Screen|
  React Native Svg|React Native Svg Transformer||||

### 개발 기간

- 전체 일정 : 2022 년 4 월 15 일 ~ 5 월 1 일 (약 2주)

[ 기획 ] 2022 년 4 월 15 일 ~ 4 월 17 일 (3일)

- 아이디어 수집
- 기술 선정
- 게임 기획 구성

[ FaceGo 개발 ] 2022 년 4 월 18 일 ~ 4 월 24 일 (1주)

- Git Repository 생성
- 개발 환경 셋팅
- Container-Presenter 디자인 패턴 적용
- 공통 컴포넌트 작업
- 기본 asset 설정
- 네비게이션 기능 추가
- 얼굴 인식 기록 기능 추가
- AsyncStorage 연결
- 애니메이션 추가
- 게임 실행, 결과 로직 추가
- 게임 효과 (진동, 사운드) 기능 추가

[ ShoutGo 개발 ] 2022 년 4 월 25 일 ~ 5 월 1 일 (1주)

- 로딩 및 세로 모드 추가
- 공통 컴포넌트 작업
- android 최적화
- 기본 asset 설정
- svg path를 사용한 object 충돌 로직 개선
- 마이크 권한 추가
- 데시벨 활용 로직 추가
- Mater.js 게임 엔진 추가
- 게임 실행, 결과 로직 추가

## 챌린지

#### React Native CLI

React Native 개발을 게획하며 가장 먼저 정해야 했던 사항은 Expo와 CLI 환경 중 하나를 선택해야 하는 일 입니다.
우리 팀은 사용, 개발, 배포가 쉬우며 , Window,Linux에서도 사용이 가능하고 적절하고 많은 기능의 네이티브 모듈을 가진 Expo가 아닌 CLI를 선택하였습니다.
Expo처럼 앱 주변에 Wrapper가 있어 크기가 커지는 것은 경계해야 할 사항이라고 생각했기 때문이며 RN의 첫 개발 프로젝트에서 현업에서 사용하는 CLI로 개발 하는 것은 같은 환경에서 개발을 해본 좋은 경험이라고 공감했기 때문입니다.

#### React Native GameEngine

개발 초기에는 RN Game Engine의 각각의 엔티티들을 Matter.js에서 제공해주는 간단한 도형으로만 생성을 하였을떄 화면의 끊김 현상이 없었지만 각각 엔티티들의 이미지를 이용해서 생성했을때는 화면 끊김 현상이 발생하였습니다.

```
// 간단한 도형으로 생성
Matter.Bodies.rectangle();

// 이미지로 생성
Matter.Vertices.fromPath(svg 정보);
Matter.Bodies.fromVertices();
```

React Native에서는 javascript 비즈니스 로직관련 코드들을 javascript Thread가 관리하고 javascript Thread가 Native bridge를 통해
Native side(Android, ios)와 통신을 한다고 합니다.
javascript Thread가 처리해야할 로직이 많고 무거울 경우에는 Native bridge에서 병목현상이 발생하여 화면 끊김 현상이 발생합니다.

```
// 화면 끊김 현상 발생
<GameEngine
  (...중략...)
  entities={createEntities()}
  (...중략...)
/>
```

현재 해당 게임에서 스코어 점수 상태로 인해 0.1초마다 GameEngine 컴포넌트가 리렌더링이 되고 있는 상황에서 위 예시 코드에 createEntities 함수가 0.1초 마다 실행되어 무겁고, 처리해야할 로직이 많아 병목현상 일어나 화면이 끊김 현상이 발생이 하였습니다.

```
<GameEngine
  (...중략...)
  entities={entities}
  (...중략...)
/>
```

그래서 위와 같이 리렌더링시에 함수 실행문을 제거하고 해당 함수를 실행한 결과를 할당하여 리렌더링마다 실행되어지는 비즈니스 로직을 줄여 병목현상이 발생하지 않도록 해서 화면 끊김 문제는 해결되었습니다.

**해당 문제가 iOS 기기에선 발생하지 않고 Android 기기에서 발생한 이유?**

Android 기기는 저주파로 멀티 코어 전원(대부분 8코어)을 지원하는 반면 iPhone은 적은 코어(2-4코어)를 사용하지만 고주파수를 사용합니다.
React Native에서는 이러한 병목 현상을 해결하기 위해 다중 코어를 사용하지 않고 싱글 코어를 사용합니다.
그래서 싱글 코어 점수(고주파)가 높은 ios기기에서는 정상적으로 실행이 되었지만 싱글 코어 점수(저주파)가 낮은 Android기기 에서는 해당 현상이 발생을 한 상황이였습니다.

#### React Native Animation

FaceGo 게임에서 캐릭터의 이동시 애니메이션 작업이 필요했고, 막힌 루트로 이동했을 때도 사용자에게 명확히 표시해주기 위해 React-Native의 Animated를 사용하여 각종 애니메이션 효과를 추가했습니다. 하지만 안드로이드 테스트 도중 애니메이션이 버벅이는 상황이 있었고, 조사해본 결과 Animated의 API는 JS Thread를 사용하기 때문에 JS Thread에 다른 작업이 있다면 frame drop이 생길 수 있다는 내용을 확인하였습니다. RN에서 제공하는 Animated 대신 Reanimated 라이브러리를 도입하여 애니메이션 계산 로직을 UI Thread에서만 실행하도록 수정하는 작업을 거쳤고, frame drop 없이 원하는 애니메이션 효과를 표현할 수 있었습니다.

#### Presentational and Container Components

로직을 수행하는 컴포넌트, UI를 보내주는 컴포넌트가 분리된 패턴으로 기능, UI에 대한 구분이 쉬워지는 장점이 있습니다.
짧은 개발기간 내 RN의 학습도 병행해야 했기에 러닝커브가 적고 팀원 모두가 이해하고 있는 디자인 패턴을 사용하는 것은
이번 프로젝트에서 장점으로 적용되었고 컴포넌트를 작성하고 분리하며 각각의 컴포넌트를 정비할 수 있었습니다.

#### iOS, Android

UI, UX를 맞추기 위한 작업과 더불어 라이브러리를 사용시에도 iOS, Android 양쪽에 대해서 모든 기능을 제공하는 것에 대한 확인도 필요했으며 같은 코드임에도 운영체제 마다 매끄럽게 동작하지 않는 부분도 발생하는 등의 다양한 노력이 필요했고 이는 RN이 가지는 장점을 위해 감수할 수 있는 부분으로 판단해 작업하였습니다.
React 생태계에 비해 아직 불안정한 상태인 RN개발을 하며 많은 에러를 접하고 해결해가며 버전의 중요성 또한 상기할 수 있었습니다.
Play Store, App Store에 배포까지 목표했기에 부족한 시간내에서도 우선순위를 높게 잡아 진행했습니다.

## 개선할 사항  

### 제스처 처리  
어플리케이션 실행 중 제스처에 대한 처리를 못한 부분이 있었고 알아보니 아래의 방법으로 간단히 수정할 수 있었습니다.  
  - createStackNavigator( )를 통해 생성한 Navigator의 screenOptions속성에 gestureEnabled: false 를 통해 화면에 대한 제스처를 금지할 수 있습니다.  

백그라운드 처리  
게임 중 foreground >>> background >>> foreground로 전환시 중단 후 재시작 해야하는 부분이 고려되지
못했습니다.  

React Native 내장 모듈인 AppState는 어플리케이션이 foreground, background중 어디에 위치하는지 알려주며 아래와 같이 상태변경을 감지할 수 있는데  

  - active : 어플리케이션이 foreground 에서 실행 중
  - background: 어플리케이션이 background 에서 실행 중으로
    - 다른 어플리케이션 사용
    - 홈 화면
    - 안드로이드-> 다른 화면
  - inactive: iOS에서 foreground, background 전환 시, 멀티태스킹, 알림센터, 통화 같은 비활성 기간동안 발생하는 상태  

background, inactive 상태로 진입 시 게임의 상태를 저장해 stop하고
foreground로 진입 시 저장된 게임의 상태를 활용해 이어서 진행할 수 있도록 구성할 수 있습니다.  

### 얼굴 인식 pitch angle 처리  

React Native Camera 라이브러리에서 모바일 기기 카메라 권한과 얼굴인식 관련 부분을 한번에 처리하기 위해 해당 라이브러리를 선택하였는데 얼굴 좌, 우로 돌리는 각도(yaw angle) 정보는 받아서 치리 할 수 있어지만, 얼굴 위, 아래로 돌리는 각도(pitch angle) 정보를 제공해주지 않아 사용자 얼굴의 눈의 위치 정보를 받아서 처리 하였는데 해당 부분이 매끄럽게 처리되지 않고 있는 상황입니다.  

해당 라이브러리 대신 모바일 기기 카메라 권한은 React Native Vision Camera 라이브러리르 사용하고 얼굴 인식 라이브러리는 Vision Camera Face Detector를 사용하여 현재 사용하고 있는 React Native Camera 라이브러리보단 카메라 라이브러리와 얼굴 인식 라이브러리 두개의 라이브러리를 사용한다는 단점이 있지만 Vision Camera Face Detector 라이브러리에서 아래처럼 pitch angle을 제공해주기 때문에 얼굴 인식 관련 처리는 더 매끄럽게 개선할 수 있을것 같습니다.
```
export interface Face {
  (...중략...)
  rollAngle: number;
  pitchAngle: number; // pitch angle 정보 제공
  yawAngle: number;
  (...중략...)
}

```