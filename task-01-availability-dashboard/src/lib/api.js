const BASE_URL = "https://task.moraspirit.com";

// Shared helper: sends a request and returns the parsed JSON,
// or throws an Error with a readable message.
async function request(path, options) {
    let response;

    try {
        response = await fetch(`${BASE_URL}${path}`, options);
    } catch (err) {
        // fetch only throws for network problems (offline, DNS, CORS...)
        // but ALSO throws an AbortError when we cancel on purpose.
        if (err.name === "AbortError") throw err;
        throw new Error("Cannot reach the server. Check your internet connection.");
    }

    // Try to read the body as JSON. It might not be JSON on a server crash.
    let data = null;
    try {
        data = await response.json();
    } catch {
        // leave data as null
    }

    // fetch does NOT throw on 400/404/500, so we check response.ok ourselves.
    if (!response.ok) {
        throw new Error(data?.message || `Request failed (status ${response.status}).`);
    }

    return data;
}

export function getMembers(signal) {
    return request("/api/members", { signal });
}

export function checkAvailability(mspId, date, signal) {
    return request("/api/availability/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msp_id: mspId, date }),
        signal,
    });
}
