import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Button, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import fetchApi from '../../api/fetchApi';
import useCommunity from '../../components/Community/useCommunity';

export default function CommunitySettings() {
	const [templates, setTemplates] = useState([]);

	const navigate = useNavigate()

	const { communityInfo } = useCommunity();

	const { communityId } = useParams();

	const templates_result = useApi('/api/communities/templates/get-templates', { communityId });

	templates_result.then((response) => {
		if (response && !response.loading && templates.length === 0) {
			setTemplates(response.data.data)
		}
	})

	const handleArchiveCommunity = async () => {
		const response = await fetchApi(`/api/communities/archive-community`, { communityId });
		if (response.success) {
			navigate('/feed')
		}
	}

	const handleDeleteTemplate = async (templateId) => {
		const newTemplates = templates.filter((template) => template.id !== templateId);
		setTemplates(newTemplates);
		await fetchApi(`/api/communities/templates/delete-template`, { templateId });
	};

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<h2 style={{ color: '#5c5b5b', marginLeft: 5 }}>
					Community Settings
				</h2>
				<Link to={`/communities/${communityId}`} style={{ marginLeft: 'auto', marginTop: 10 }}>
					<Button  >
						Back to Community
					</Button>
				</Link>
			</div>

			<Card style={{  padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
				{templates && templates.length === 0 ? (
					<h3>No templates added yet</h3>
				) : (
					<div>
						<h3>Templates</h3>
						{templates.map((template) => (
							<div>
								<div style={{ display: 'flex' }} key={template.id}>
									<h4>{template.templateName}</h4>
									<Button
										type="primary"
										size="small"
										style={{ backgroundColor: '#f5222d', fontWeight: 700, marginLeft: 20, marginTop: 15 }}
										onClick={() => handleDeleteTemplate(template.id)}
									>
										Delete
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
				<Button
					type="primary"
					size="large"
					style={{ backgroundColor: '#7952CC', fontWeight: 700, marginTop: 10 }}
					onClick={() => navigate(`/communities/${communityId}/create-template`)}
				>
					+ Add Template
				</Button>
				<Divider />
				{communityInfo.memberType === 'owner' && (
					<Button
						type="primary"
						size="large"
						style={{ backgroundColor: '#f5222d', fontWeight: 700 }}
						onClick={handleArchiveCommunity}
					>
						Archive Community
					</Button>
				)}
			</Card>
		</div>
	);
}
