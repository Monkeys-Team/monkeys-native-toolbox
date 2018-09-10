
# monkeys-native-toolbox
Toolbox for react native. It allows you to build react-native apps faster than before.

# Installation
```npm install melihmucuk/monkeys-native-toolbox --save

# API Reference
API reference divided by two parts.

## Components

```<Button />```

A button component that accepts left & right icon.

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
 
 * ```leftIcon``` (optional): Left icon of the button. It works like ```Image``` source props.
 * ```leftIconStyle``` (optional): Style of the left icon. It works like ```Image``` style.
 * ```rightIcon``` (optional): Right icon of the button. It works like ```Image``` source props.
 * ```rightIconStyle``` (optional): Style of the right icon. It works like ```Image``` style.
 * ```containerStyle``` (optional): Style of the button container. It works like ```TouchableOpacity``` style.
 * ```textStyle``` (optional): Style of the button text. It works like ```Text```style.