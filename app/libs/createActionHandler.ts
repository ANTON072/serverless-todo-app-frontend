import { json } from "react-router";

type HandlerFunction = () => Promise<Response>;

type Handlers = {
  [key: string]: HandlerFunction;
};

export const createActionHandler = (request: Request, handlers: Handlers) => {
  const method = request.method.toLowerCase();

  if (method in handlers) {
    return handlers[method]();
  }

  return Promise.resolve(
    json({ message: "Method not allowed" }, { status: 405 }),
  );
};
