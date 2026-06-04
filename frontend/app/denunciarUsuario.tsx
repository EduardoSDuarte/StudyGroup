import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function DenunciarUsuario() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#4F7CFF",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Denunciar Usuário 🚨
      </Text>

      <TextInput
        placeholder="Nome do usuário"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Motivo da denúncia"
        placeholderTextColor="#999"
        multiline
        numberOfLines={5}
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          height: 150,
          textAlignVertical: "top",
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#E74C3C",
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
          Enviar Denúncia
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
