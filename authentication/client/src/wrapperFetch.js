async function customFetch(url, options) {
  let response = await fetch(url, options);
  if (response.status === 401) {
    const refreshResult = await fetch(
      "http://localhost:3000/user/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      },
    );
    const data = await refreshResult.json();
    console.log(data);
    localStorage.setItem("access_token", data.newAccessToken);
    console.log(refreshResult);
    if (refreshResult.ok) {
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          authorization: `Bearer ${data.newAccessToken}`,
        },
      };
      return await fetch(url, newOptions);
    } else {
      window.location.href = "./login";
    }
  }
  return response;
}

export default customFetch;
