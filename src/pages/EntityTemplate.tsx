import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import sampleRequestBodies from "./sampleRequestBodies ";

const EntityTemplate = ({ entityName, logoSrc }) => {

  const apiTabs = sampleRequestBodies[entityName] || [];

  const tabNames = apiTabs.map((tab) => tab.tabName);

  const [activeTabIndex, setActiveTabIndex] = useState(apiTabs.length ? 0 : null);

  const activeTab = activeTabIndex !== null ? apiTabs[activeTabIndex] : null;

  const endpoints = activeTab && activeTab.endpoints ? activeTab.endpoints : [];
  const [activeEndpointIndex, setActiveEndpointIndex] = useState(endpoints.length ? 0 : null);
  const activeEndpoint = activeEndpointIndex !== null ? endpoints[activeEndpointIndex] : {};

  const [hostUrl, setHostUrl] = useState(activeEndpoint?.url || "");
  const [httpMethod, setHttpMethod] = useState(activeEndpoint?.httpMethod || "GET");
  const [request, setRequest] = useState(activeEndpoint?.sampleBody || "{}");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [authType, setAuthType] = useState("None");
  const [authToken, setAuthToken] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [basicAuth, setBasicAuth] = useState({ username: "", password: "" });
  const [authLocation, setAuthLocation] = useState("Header");

  const [editorEnlarged, setEditorEnlarged] = useState(false);
  const [responseEditorEnlarged, setResponseEditorEnlarged] = useState(false);

  useEffect(() => {
    if (activeTab && activeTab.endpoints && activeTab.endpoints.length > 0) {
      setActiveEndpointIndex(0);
    } else {
      setActiveEndpointIndex(null);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeEndpoint) {
      setHostUrl(activeEndpoint.url || "");
      setHttpMethod(activeEndpoint.httpMethod || "GET");
      setRequest(activeEndpoint.sampleBody || "{}");
    }
  }, [activeEndpoint]);

  const handleRequest = async () => {
    if (!request.trim()) return;

    setLoading(true);
    setResponse("");
    setError("");

    let headers = { "Content-Type": "application/json" };
    let finalUrl = hostUrl;

    if (authLocation === "Parameter") {
      try {
        const urlObj = new URL(hostUrl);
        if (authType === "Bearer Token" && authToken) {
          urlObj.searchParams.append("authToken", authToken);
        } else if (authType === "API Key" && apiKey) {
          urlObj.searchParams.append("apiKey", apiKey);
        } else if (authType === "Basic Auth" && basicAuth.username && basicAuth.password) {
          urlObj.searchParams.append("username", basicAuth.username);
          urlObj.searchParams.append("password", basicAuth.password);
        }
        finalUrl = urlObj.toString();
      } catch (err) {
        console.error("Invalid URL:", err);
      }
    } else {
      if (authType === "Bearer Token" && authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      } else if (authType === "API Key" && apiKey) {
        headers["x-api-key"] = apiKey;
      } else if (authType === "Basic Auth" && basicAuth.username && basicAuth.password) {
        const encoded = btoa(`${basicAuth.username}:${basicAuth.password}`);
        headers["Authorization"] = `Basic ${encoded}`;
      }
    }

    try {
      const res = await fetch(finalUrl, {
        method: httpMethod,
        headers,
        body: httpMethod === "GET" || httpMethod === "HEAD" ? null : request,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.startsWith("image/")) {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        setResponse(imageUrl);
      } else {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full space-y-6">
      <div className="flex flex-col space-y-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoSrc} alt={`${entityName} Logo`} className="h-28 w-28 rounded-md" />
            <h1 className="text-3xl font-bold text-gray-900">{entityName} API Portal</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex-grow bg-gray-50 p-4 border rounded-lg shadow-sm">
            <label className="text-gray-700 font-medium">API Endpoint:</label>
            <input
              type="text"
              value={hostUrl}
              onChange={(e) => setHostUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-grow bg-gray-50 p-4 border rounded-lg shadow-sm">
            <label className="text-gray-700 font-medium">HTTP Method:</label>
            <input
              type="text"
              value={httpMethod}
              readOnly
              className="w-full px-3 py-2 text-sm border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-grow bg-gray-50 p-4 border rounded-lg shadow-sm">
            <label className="text-gray-700 font-medium">Authentication Type:</label>
            <select
              value={authType}
              onChange={(e) => setAuthType(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none mt-2"
            >
              <option value="None">None</option>
              <option value="Bearer Token">Bearer Token</option>
              <option value="API Key">API Key</option>
              <option value="Basic Auth">Basic Authentication</option>
            </select>
          </div>
          {authType !== "None" && (
            <div className="flex-grow bg-gray-50 p-4 border rounded-lg shadow-sm">
              <label className="text-gray-700 font-medium">Authentication Location:</label>
              <select
                value={authLocation}
                onChange={(e) => setAuthLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none mt-2"
              >
                <option value="Header">Header</option>
                <option value="Parameter">URL Parameter</option>
              </select>
            </div>
          )}
        </div>
        {authType !== "None" && (
          <div className="bg-gray-50 p-4 border rounded-lg shadow-sm">
            {authType === "Bearer Token" && (
              <input
                type="text"
                placeholder="Enter Bearer Token"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
            {authType === "API Key" && (
              <input
                type="text"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}
            {authType === "Basic Auth" && (
              <div className="flex flex-col space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Username"
                  value={basicAuth.username}
                  onChange={(e) => setBasicAuth({ ...basicAuth, username: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={basicAuth.password}
                  onChange={(e) => setBasicAuth({ ...basicAuth, password: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="border-b pb-2">
        <div className="flex gap-4">
          {tabNames.length > 0 ? (
            tabNames.map((tabName, index) => (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`px-4 py-2 text-lg font-medium border-b-2 transition ${
                  activeTabIndex === index
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
              >
                {tabName}
              </button>
            ))
          ) : (
            <p>No APIs defined for {entityName}</p>
          )}
        </div>
      </div>
      {activeTab && activeTab.endpoints && activeTab.endpoints.length > 1 && (
        <div className="flex gap-2 mb-4">
          {activeTab.endpoints.map((ep, idx) => (
            <button
              key={idx}
              onClick={() => setActiveEndpointIndex(idx)}
              className={`px-3 py-1 rounded-md transition ${
                activeEndpointIndex === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {ep.endpointName}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        <div className="border p-4 bg-white rounded-lg shadow-lg transition hover:shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              Request Editor - {entityName} (
              {activeTab && activeTab.tabName}{" "}
              {activeTab &&
                activeTab.endpoints &&
                activeTab.endpoints.length > 1 &&
                `(${activeEndpoint.endpointName})`}
              )
            </h2>
            <button
              onClick={() => setEditorEnlarged(!editorEnlarged)}
              className="text-sm text-blue-500 hover:underline"
            >
              {editorEnlarged ? "Shrink" : "Enlarge"}
            </button>
          </div>
          <textarea
            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-y ${
              editorEnlarged ? "h-64" : "h-32"
            }`}
            placeholder="Enter JSON request..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button
            onClick={handleRequest}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Send Request"}
            <FaPaperPlane />
          </button>
        </div>
        <div className="border p-4 bg-white rounded-lg shadow-lg transition hover:shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              Response Editor - {activeTab && activeTab.tabName}{" "}
              {activeTab &&
                activeTab.endpoints &&
                activeTab.endpoints.length > 1 &&
                `(${activeEndpoint.endpointName})`}
            </h2>
            <button
              onClick={() => setResponseEditorEnlarged(!responseEditorEnlarged)}
              className="text-sm text-blue-500 hover:underline"
            >
              {responseEditorEnlarged ? "Shrink" : "Enlarge"}
            </button>
          </div>
          {loading ? (
            "Fetching response..."
          ) : error ? (
            `Error: ${error}`
          ) : (
            <pre
              className={`bg-gray-50 p-3 border border-gray-300 rounded-md text-gray-800 overflow-auto transition ${
                responseEditorEnlarged ? "h-64" : "h-32"
              }`}
            >
              {response || "Waiting for response..."}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityTemplate;
