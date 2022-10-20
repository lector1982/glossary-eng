import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';
import ModeView from '@/views/ModeView';
import AddCategoryView from '@/views/AddCategoryView';
import AddWordView from '@/views/AddWordView';

const routes = [
	{
		path: '/',
		component: HomeView
	},
	{
		path: '/mode',
		component: ModeView
	},
	{
		path: '/add_cat',
		component: AddCategoryView
	},
	{
		path: '/add_word',
		component: AddWordView
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;