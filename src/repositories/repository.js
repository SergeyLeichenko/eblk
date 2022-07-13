/**
 * Copyright (C) Vantino SARL, Switzerland 2004 - 2020, All Rights Reserved.
 *
 * The information contained in this program is the exclusive property of Vantino SARL.
 * This program is protected under Swiss copyright law and other international copyright
 * treaties and conventions. All copies, whether in whole or in part, shall affix
 * the present copyright notice. No part of this program may be reproduced or
 * transmitted for commercial purposes, in any form or by any means, electronic
 * or mechanical, including photocopying and recording, or by any information
 * storage or retrieval system, except as expressly permitted in writing by Vantino SARL.
 * All requests should be sent to:
 * Vantino SARL
 * CP 2933
 * 1211 Geneva 2
 * SWITZERLAND
 */

import axios from 'axios';

const DOMAIN = 'https://api.eb.lk';
const BASE_URL = DOMAIN + '/api/v2/kpi';
const KPI = 'k';
const KPIS = 'ks';
const KV = 'v';
const KVS = 'vs';

export default
{
    //
    // Add kpi
    //
    addKpi(cid, key, description)
    {
        // url for add kpi
        const url = BASE_URL + '/' + KPI;
        console.log("url: " + url + " key: " + key + " description: " + description)

        // configure Axios for Api requests
        const http = axios.create({
            BASE_URL,
            headers: { 'Content-Type': 'application/json' }
        });

        // request to API endpoint
        return http.post(URL, {
            'cid': cid,
            'key': key,
            'dsc': description
        })
        .then(response => {
            console.log("Response status: " + response.status)
            console.log("Response data: " + response.data)
            if (201 === response.status) {
               return response.data
            }
       }).catch(error => { console.log("Fail to add kpi: " + error) });
    },
}
