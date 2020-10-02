
    <><View style={{ flex: 1, backgroundColor: '#eee' }}>
    <View style={styles.image}>
      <Image source={require('./img/logoCardio.png')} />
    </View>

    <View style={styles.wrapper}>
      <View style={styles.image2}>
        <Image source={require('./img/Shape_2_copiasm.png')} />
      </View>
      <Text style={styles.login}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        onChangeText={text => {
          setError
          setEmail(text)
        }}
        error={isValid}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        error={isValid}
      />
      <View>
        <TouchableHighlight 
        style={styles.btnSend}
        onPress={__doSingIn}>
          <Text style={styles.textSend}>Ingresar</Text>
        </TouchableHighlight>
      </View>
    </View>
  </View>
  </>