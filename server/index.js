import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-white flex h-screen justify-center align-middle",
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Fast React Pizza Co."
  }, {
    name: "description",
    content: "Simple React Pizza App"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col m-auto h-screen m-w-[80rem] gap-5",
    children: [/* @__PURE__ */ jsx("header", {
      className: "uppercase text-amber-200 w-full text-center",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-4xl",
        children: "- Fast React Pizza Co. -"
      })
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx("footer", {
      className: "text-2xl",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center flex flex-col gap-4",
        children: [/* @__PURE__ */ jsx("p", {
          children: "We're open from 12:00 to 22:00. Come visit us or order online."
        }), /* @__PURE__ */ jsx("button", {
          className: "btn btn-yellow",
          children: "Order"
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false
  }
];
function PizzaCard({ pizza }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex gap-3 ${pizza.soldOut ? "sold-out" : ""}`, children: [
    /* @__PURE__ */ jsx("img", { className: "self-start aspect-square w-40", src: pizza.photoName, rel: pizza.name }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-1 px-0", children: [
      /* @__PURE__ */ jsx("h3", { children: pizza.name }),
      /* @__PURE__ */ jsx("p", { children: pizza.ingredients }),
      /* @__PURE__ */ jsx("span", { children: pizza.soldOut ? "Sold Out" : pizza.price })
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "Fast React Pizza Co."
  }, {
    name: "description",
    content: "Simple React Pizza App"
  }];
}
function Menu() {
  return /* @__PURE__ */ jsxs("div", {
    className: "items-center flex flex-col gap-4",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-2xl uppercase border-t-2 border-b-2 py-4 px-0",
      children: "Our Menu"
    }), /* @__PURE__ */ jsx("p", {
      className: "text-center w-[80]",
      children: "Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious."
    }), /* @__PURE__ */ jsx("div", {
      className: "grid gap-4 grid-cols-2",
      children: pizzaData && pizzaData.map((pizza) => /* @__PURE__ */ jsx(PizzaCard, {
        pizza
      }, pizza.name))
    })]
  });
}
const menu = UNSAFE_withComponentProps(Menu);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: menu,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "urc-03-pizza-menuassets/entry.client-GA9JmuHS.js", "imports": ["urc-03-pizza-menuassets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "urc-03-pizza-menuassets/root-D4W6zjRO.js", "imports": ["urc-03-pizza-menuassets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": ["urc-03-pizza-menuassets/root-CVbnbTlB.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "urc-03-pizza-menuassets/home-BwHx5rPH.js", "imports": ["urc-03-pizza-menuassets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/menu": { "id": "routes/menu", "parentId": "routes/home", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "urc-03-pizza-menuassets/menu-CNlyA3mt.js", "imports": ["urc-03-pizza-menuassets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "urc-03-pizza-menuassets/manifest-31514bd3.js", "version": "31514bd3", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "urc-03-pizza-menu";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/menu": {
    id: "routes/menu",
    parentId: "routes/home",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
