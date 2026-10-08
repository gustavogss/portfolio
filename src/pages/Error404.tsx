import React from 'react';
import ErrorPage from './ErrorPage';

export default function Error404() {
  return (
    <ErrorPage 
      statusCode="404" 
      title="Página não encontrada" 
      message="A página ou rota solicitada não foi localizada no servidor. O endereço pode ter sido digitado incorretamente ou não está mais ativo."
    />
  );
}
