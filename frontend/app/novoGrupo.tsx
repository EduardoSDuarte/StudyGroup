import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function NovoGrupo() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0B1E4D",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
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
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Criar Grupo 👥
      </Text>

      <TextInput
        placeholder="Nome do Grupo"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 20,
          height: 120,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4F7CFF",
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
          Criar Grupo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
