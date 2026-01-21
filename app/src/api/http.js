// app/src/api/http.js
import { AppError, ErrorType, mapHttpStatusToErrorType } from "./errors";

export async function requestJson(url, options) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const type = mapHttpStatusToErrorType(res.status);
      throw new AppError(type, "Request failed");
    }

    return await res.json();
  } catch (err) {
    // fetch wirft bei Netzwerkproblemen meist TypeError (keine Response)
    if (err instanceof AppError) throw err;

    throw new AppError(ErrorType.NETWORK_FAILURE, "Network error");
  }
}
