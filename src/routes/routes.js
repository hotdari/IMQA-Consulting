import WorkspaceLayout from "@/views/Layout/WorkspaceLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";

import NotFound from "@/views/NotFoundPage.vue";

const routes = [
	{
		path: "/",
		redirect: "workspace",
		component: WorkspaceLayout,
		children: [
			{
				path: "/workspace",
				name: "workspace",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "demo" */ "../views/Workspace.vue")
			}
		]
	},
	{
		path: "/",
		redirect: "login",
		component: AuthLayout,
		children: [
			{
				path: "/login",
				name: "login",
				component: () => import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
			},
			// {
			//   path: '/register',
			//   name: 'register',
			//   component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
			// },
			{
				path: "/setup",
				name: "setup",
				component: () => import(/* webpackChunkName: "demo" */ "../views/Pages/Setup.vue")
			},
			{ path: "*", component: NotFound }
		]
	}
];

export default routes;
