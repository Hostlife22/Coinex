interface IReq {
  alias?: string;
  body?: any;
}

export const hasOperationName = (req: IReq, operationName: string) => {
  const { body } = req;
  return body.hasOwnProperty('operationName') && body.operationName === operationName;
};

export const aliasQuery = (req: IReq, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

export const aliasMutation = (req: IReq, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
