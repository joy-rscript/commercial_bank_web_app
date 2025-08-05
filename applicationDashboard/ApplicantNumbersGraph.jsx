import React from 'react'
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { layouts } from 'chart.js/auto';
import DetailedListCard from '../DetailedListCard';
import DashboardSection from '../DashboardSection'
import axios from 'axios';
import { useState, useEffect } from 'react';

// const allApplicants = [
// 	{
// 		first_name: 'Akua Naa Norley Maame-afria',
// 		last_name: 'Mensimah',
// 		id_number: '123456789',
// 		mobile_1: '1234567890',
// 		email: 'john.doe@example.com',
// 		current_net_income: 50000,
// 		current_employer_name: 'ABC Company',
// 		employment_title: 'Software Engineer',
// 		preferred_location1: 'New York',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-01-01',
// 		toggleHide: 'No'
// 	},
// 	{
// 		first_name: 'Jane',
// 		last_name: 'Smith',
// 		id_number: '987654321',
// 		mobile_1: '0987654321',
// 		email: 'jane.smith@example.com',
// 		current_net_income: 75000,
// 		current_employer_name: 'XYZ Corporation',
// 		employment_title: 'Marketing Manager',
// 		preferred_location1: 'Los Angeles',
// 		appType: 'Purchase',
// 		approved: 'Yes',
// 		date_received: '2023-04-15',
// 		toggleHide: 'No'
// 	},
// 	{
// 		first_name: 'Michael',
// 		last_name: 'Johnson',
// 		id_number: '456789012',
// 		mobile_1: '6789012345',
// 		email: 'michael.johnson@example.com',
// 		current_net_income: 60000,
// 		current_employer_name: 'Acme Inc.',
// 		employment_title: 'Financial Analyst',
// 		preferred_location1: 'Chicago',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-07-25',
// 		toggleHide: 'No'
// 	},
// 	{
// 		first_name: 'Emily',
// 		last_name: 'Davis',
// 		id_number: '789012345',
// 		mobile_1: '2345678901',
// 		email: 'emily.davis@example.com',
// 		current_net_income: 80000,
// 		current_employer_name: 'Globex Corp',
// 		employment_title: 'Project Manager',
// 		preferred_location1: 'San Francisco',
// 		appType: 'single',
// 		approved: 'Yes',
// 		date_received: '2023-01-10',
// 		toggleHide: 'No'
// 	},
// 	{
// 		first_name: 'David',
// 		last_name: 'Wilson',
// 		id_number: '345678901',
// 		mobile_1: '9012345678',
// 		email: 'david.wilson@example.com',
// 		current_net_income: 65000,
// 		current_employer_name: 'Stark Industries',
// 		employment_title: 'Sales Representative',
// 		preferred_location1: 'Boston',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-04-20',
// 		toggleHide: 'No'
// 	},
// 	{
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-01-01',
// 		toggleHide: 'No'
// 	}
// 	, {
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-02-02',
// 		toggleHide: 'No'
// 	}, {
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'Yes',
// 		date_received: '2023-09-09',
// 		toggleHide: 'No'
// 	}, {
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-09-05',
// 		toggleHide: 'No'
// 	}, {
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'No',
// 		date_received: '2023-02-02',
// 		toggleHide: 'No'
// 	}, {
// 		first_name: 'Sophia',
// 		last_name: 'Martinez',
// 		id_number: '678901234',
// 		mobile_1: '5678901234',
// 		email: 'sophia.martinez@example.com',
// 		current_net_income: 70000,
// 		current_employer_name: 'Umbrella Corp',
// 		employment_title: 'Human Resources Specialist',
// 		preferred_location1: 'Miami',
// 		appType: 'single',
// 		approved: 'Yes',
// 		date_received: '2023-02-02',
// 		toggleHide: 'No'
// 	}
// ]

// fetch the data from pending applicants


export default function ApplicantNumbersGraph() {

	const [allApplicants, setAllApplicants] = useState([]);
	const get_applications = async () => {
		useEffect(() => {
			const fetchData = async () => {
				try {
					const response = await axios.get('http://localhost:8000/rto/get_applications/', {});
					
					console.log(response.data);
					setAllApplicants(response.data);

				} catch (error) {
					console.error('Error fetching all applicants:', error);
				}
			};

			fetchData();
		});
	}

	const applicantSuccessData = [
		{ month: "J", approved: 0, denied: 0, total: 4 },
		{ month: "F", approved: 0, denied: 0, total: 4 },
		{ month: "M", approved: 0, denied: 0, total: 4 },
		{ month: "A", approved: 0, denied: 0, total: 4 },
		{ month: "M", approved: 0, denied: 0, total: 4 },
		{ month: "J", approved: 0, denied: 0, total: 4 },
		{ month: "J", approved: 0, denied: 0, total: 4 },
		{ month: "A", approved: 0, denied: 0, total: 4 },
		{ month: "S", approved: 0, denied: 0, total: 4 },
		{ month: "O", approved: 0, denied: 0, total: 4 },
		{ month: "N", approved: 0, denied: 0, total: 4 },
		{ month: "D", approved: 0, denied: 0, total: 4 },
	];

	allApplicants?.forEach((applicant) => {
		const month = new Date(applicant.date_received).toLocaleString('default', { month: 'short' }).charAt(0);
		const monthData = applicantSuccessData.find((data) => data.month === month);
		if (monthData) {
			applicant.approved === 'Yes' ?
				monthData.approved += 1 :monthData.denied += 1;
		}
	});

	const maxNum = Math.max(...applicantSuccessData.map(item => item.approved + item.denied));
	applicantSuccessData.forEach(month => month.total = maxNum + 3);
	const avgNum = Math.ceil(allApplicants.length / 1); 
	// TODO: compute avg accurately
	
	get_applications();
	const data = {
		labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
		datasets: [
			{
				label: 'Denied',
				data: applicantSuccessData.map(d => d.denied),
				backgroundColor: '#2A6496',
				barPercentage: 0.3,
				stack: 'Stack 1',
			},
			{
				label: 'Approved',
				data: applicantSuccessData.map(d => d.approved),
				backgroundColor: '#FFC423',
				barPercentage: 0.3,
				stack: 'Stack 1',
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'right', // Position the legend to the right
				align: 'start',
				labels: {
					usePointStyle: true,
					boxWidth: 5,
					boxHeight: 5,
				}
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || '';
						if (label) label += ': ';
						if (context.parsed.y !== null) label += context.parsed.y;
						return label;
					}
				}
			}
		},
		layout: {
			padding: {
				right: 5
			}
		},
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false
				},
				ticks: {
					maxRotation: 0,
					minRotation: 0
				}
			},
			y: {
				stacked: true,
				beginAtZero: true,
				max: maxNum + 2,
				grid: {
					display: true,
					drawBorder: false
				}

			}
		},
		maintainAspectRatio: false
	};

	return (
		<div className=" bg-white pb-4 rounded-sm border flex flex-col flex-1">
			<div className="p-2 flex flex-row justify-start items-end">
				<span className="text-3xl font-bold">{avgNum}</span>
				<h2 className="ml-2">Each Month</h2>
			</div>
			<div className=" flex-1 text-xs rounded-sm">
				<Bar data={data} options={options} />
			</div>
		</div>
	);
}
