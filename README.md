
# monkeys-native-toolbox
[**IMPORTANT**] This toolbox is in under heavy development right now. You should wait until published on npm. The responsibility is yours.

Toolbox for react native. It allows you to build react-native apps faster than before.

# Installation
`npm install melihmucuk/monkeys-native-toolbox --save`

# API Reference
API reference divided by two parts.

  * [Components](https://github.com/melihmucuk/monkeys-native-toolbox#components)
    * [Button](https://github.com/melihmucuk/monkeys-native-toolbox#button-)
    * [MTextInput](https://github.com/melihmucuk/monkeys-native-toolbox#mtextinput-)
    * [EmailInput](https://github.com/melihmucuk/monkeys-native-toolbox#emailinput-)
    * [PasswordInput](https://github.com/melihmucuk/monkeys-native-toolbox#passwordinput-)
    * [Avatar](https://github.com/melihmucuk/monkeys-native-toolbox#avatar-)

## Components

### `<Button />`

A button component that accepts left & right icon. All `Button` props are accepted.

**Example**
```javascript
<Button
 leftIcon={{uri:  'your icon uri'}}
 rightIcon={{uri:  'your icon uri'}}
>
  Hello World
</Button>
```

**Props**
 
 * `leftIcon` (optional): Left icon of the button. It works like `Image` source props.
 * `leftIconStyle` (optional): Style of the left icon. It works like `Image` style.
 * `rightIcon` (optional): Right icon of the button. It works like `Image` source props.
 * `rightIconStyle` (optional): Style of the right icon. It works like `Image` style.
 * `containerStyle` (optional): Style of the button container. It works like `TouchableOpacity` style.
 * `textStyle` (optional): Style of the button text. It works like `Text` style.

### `<MTextInput />`

A TextInput component that accepts left & right icon with onPress event. All `TextInput` props are accepted.

**Example**
```javascript
<MTextInput 
 leftIcon={{uri: 'your icon uri'}} 
 leftIconOnPress={() => alert('Left icon pressed!')}
 rightIcon={{uri: 'your icon uri'}} 
 rightIconOnPress={() => alert('Right icon pressed!')}
 placeholder={'Hello'} 
/>
```

**Props**
 
 * `leftIcon` (optional): Left icon of the input. It works like `Image` source props.
 * `leftIconStyle` (optional): Style of the left icon. It works like `Image` style.
 * `leftIconOnPress` (optional): A function that runs when left icon pressed.
 * `rightIcon` (optional): Right icon of the input. It works like `Image` source props.
 * `rightIconStyle` (optional): Style of the right icon. It works like `Image` style.
 * `rightIconOnPress` (optional): A function that runs when right icon pressed.
 * `containerStyle` (optional): Style of the input container. It works like `View` style.
 * `inputStyle` (optional): Style of the input. It works like `TextInput` style.

### `<EmailInput />`

A TextInput component for email. Keyboard type is `email-address`. All `TextInput` and [MTextInput](https://github.com/melihmucuk/monkeys-native-toolbox#mtextinput-) props are accepted.

### `<PasswordInput />`

A TextInput component for password. Secure text entry enabled by default. All `TextInput` and [MTextInput](https://github.com/melihmucuk/monkeys-native-toolbox#mtextinput-) props are accepted.

### `<Avatar />`

An avatar component to shows user's profile picture.

**Example**
```javascript
<Avatar 
 source={{uri: 'your image uri'}}
 size={80}
/>
```

**Props**

 * `source` (required): User's profile picture source. It works like `Image` source props.
 * `size` (optional): Size of avatar component. This value used to resize avatar component's width and height.
 * `onPress` (optional): A function that runs when avatar pressed.
 * `containerStyle` (optional): Style of the avatar container. It works like `TouchableOpacity` style.
 * `imageStyle` (optional): Style of the avatar's image. It works like `Image` style.
 * `buttonProps` (optional): `TouchableOpacity` props.
 * `imageProps` (optional): `Image` props. 


## Roadmap

### Components
 - [x] Button
 - [x] TextInput
 - [x] EmailInput
 - [x] PasswordInput
 - [x] Avatar
 - [ ] Loading
 - [ ] Button Group
 - [ ] Switch
 - [ ] Slider 
 - [ ] NavButton
 - [ ] Alert

### Helpers
 - [x] Statics
 - [x] Normalize
 - [x] Api
 - [x] Navigation
 - [ ] Location