import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 38,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        StudyGroup 🚀
      </Text>

      <Text
        style={{
          color: "#CCCCCC",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Bem-vindo ao seu grupo de estudos
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={() => router.push("/recuperarSenha")}
        style={{
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/grupos")}
        style={{
          backgroundColor: "#4F7CFF",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/cadastro")}
        style={{
          backgroundColor: "#2D3A68",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Criar Conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
