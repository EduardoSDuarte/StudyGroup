import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Cadastro() {
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
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Criar Conta ✨
      </Text>

      <Text
        style={{
          color: "#CCCCCC",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Comece sua jornada de estudos
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

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
          marginBottom: 20,
        }}
      />

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
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text
          style={{
            color: "#CCCCCC",
            textAlign: "center",
          }}
        >
          Já possui conta? Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
