import tokenService from "./tokenService"

export function withSession(funcao) {
  return async (ctx) => {
    const token = tokenService.get(ctx);

    const session = axios.get('http://localhost:8080/users/session', {
      method: 'GET',
      headers: {"JWT": token},
    }).then((res) => {
      return res.data
    })

    const modifiedCtx = {
      ...ctx,
      req: {
        ...ctx.req,
        session,
      }
    };
    return funcao(modifiedCtx);

  }
}