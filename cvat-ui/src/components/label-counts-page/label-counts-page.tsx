// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Result from 'antd/lib/result';
import {
    Chart, CategoryScale, LinearScale, BarElement, Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { getCore } from 'cvat-core-wrapper';
import CVATLoadingSpinner from 'components/common/loading-spinner';

const core = getCore();

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface LabelCount {
    id: number;
    name: string;
    count: number;
}

function LabelCountsPage(): JSX.Element {
    const { tid } = useParams<{ tid: string }>();
    const [counts, setCounts] = useState<LabelCount[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        core.server.request(`${core.config.backendAPI}/test/label-counts/${tid}`, { method: 'GET' })
            .then((response: { data: LabelCount[] }) => setCounts(response.data))
            .catch(setError);
    }, [tid]);

    if (error) {
        return <Result status='error' title={error.message} />;
    }

    if (counts === null) {
        return <CVATLoadingSpinner />;
    }

    return (
        <div className='cvat-label-counts-page'>
            <Bar
                data={{
                    labels: counts.map((item) => item.name),
                    datasets: [{ label: 'Annotations', data: counts.map((item) => item.count) }],
                }}
            />
        </div>
    );
}

export default React.memo(LabelCountsPage);
