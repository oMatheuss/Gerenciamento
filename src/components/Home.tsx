import { MDBCol } from 'mdb-react-ui-kit';
import { useLoaderData } from 'react-router-dom';
import { User } from '../Types/ApiTypes';

import CanvasJSReact from '../lib/canvasjs.react';
import { useEffect, useState } from 'react';
import { Api } from '../services/Api';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const getOptions = (onGoing: number, finished: number, interrupted: number) => {
	let total = onGoing + finished + interrupted;
	if (total === 0) total = 1;
	return {
		//exportEnabled: true,
		animationEnabled: true,
		backgroundColor: 'transparent',
		title: {
			text: "Atividades",
		},
		data: [{
			type: "pie",
			startAngle: 75,
			toolTipContent: "<b>{label}</b>: {y}%",
			showInLegend: "true",
			legendText: "{label}",
			indexLabelFontSize: 16,
			indexLabel: "{label} - {y}%",
			dataPoints: [
				{ y: onGoing / total * 100, label: "Em andamento" },
				{ y: interrupted / total * 100, label: "Interrompido" },
				{ y: finished / total * 100, label: "Encerrado" },
			]
		}]
	}
}

function Home() {

	const user = useLoaderData() as User;
	const [chartOptions, setChartOption] = useState(getOptions(0, 0, 0));

	useEffect(() => {
		Api.getActivitiesStatus().then((v) => {
			setChartOption(getOptions(v.onGoing, v.finished, v.interrupted));
        });
    }, []);

    return (
        <>
			<p className='small text-dark' >Bem vindo <strong>{user.name}</strong> !</p>

			<MDBCol offsetLg='3' lg='6' >
				<CanvasJSChart options={chartOptions} />
            </MDBCol>
        </>
    );
}

export default Home;