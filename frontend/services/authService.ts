import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase';
import api from './api';

// Login com email e senha
export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Cadastro com email e senha
export const cadastro = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Recuperar senha por email
export const recuperarSenha = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

// Atualizar dados do perfil no backend
export const atualizarPerfil = async (dados: { newEmail?: string; newPassword?: string; name?: string }) => {
  const res = await api.put('/auth/update', dados);
  return res.data;
};

// Excluir conta no backend
export const excluirConta = async () => {
  const res = await api.delete('/auth/delete-account');
  return res.data;
};