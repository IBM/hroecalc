/*
 * HROECalc – Return on Investment for Ethics in AI Calculator
 * Release: v0.85 (2025-01-01)
 * Release Notes: docs/releases/v0.85.md
 * SPDX-License-Identifier: MIT
 * Original Author: Jose De Jesus (jdejesus@us.ibm.com)
 * Additional contributors listed in CONTRIBUTORS.md
 *
 * The HROE Framework Calculator (“Calculator”) is an implementation of 
 * research conducted jointly by IBM and the University of Notre Dame through
 * the Notre Dame–IBM Technology Ethics Lab. The corresponding research paper 
 * is available at: https://arxiv.org/pdf/2309.13057
 *
 * Copyright IBM Corp. 2024–2025. All Rights Reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 *
 * The above notice, including all attribution, copyright, and permission statements,
 * shall be included in all copies or substantial portions of the Software.
 */

const hroeExamples = [
    {
        initial_investment: '1',
        years: '2',
        discount: '0.10',
        org_revenues: '100',
        fine_avoidance: '6',
        intangible_value: '0.5',
        investment_cost: '0.3',
        capability_returns: '0.5'
    },
    {
        initial_investment: '20',
        years: '5',
        discount: '0.08',
        org_revenues: '1,3.5,4.2,6,2',
        fine_avoidance: '3,1,2,0,5',
        intangible_value: '0.7,0.3,1.5,1.8,4.5',
        investment_cost: '0.5,2.5,4.5,2,6.5',
        capability_returns: '0.8,2.5,3.5,4,7'
    },
    {
        initial_investment: '1.5',
        years: '6',
        discount: '0.12',
        org_revenues: '2,3,4,5,6,7',
        fine_avoidance: '1,2,3,4,5,6',
        intangible_value: '0.6,0.7,0.8,0.9,1,1.1',
        investment_cost: '0.4,0.5,0.6,0.7,0.8,0.9',
        capability_returns: '1,1.5,2,2.5,3,3.5'
    },
    {
        initial_investment: '2.5',
        years: '4',
        discount: '0.07',
        org_revenues: '3,4,5,6',
        fine_avoidance: '2,3,4,5',
        intangible_value: '1.5,2.5,3.5,4.5',
        investment_cost: '1,2,3,4',
        capability_returns: '4,5,6,7'
    },
    {
        initial_investment: '3',
        years: '8',
        discount: '0.09',
        org_revenues: '1,1.5,2,2.5,3,3.5,4,4.5',
        fine_avoidance: '2,2.5,3,3.5,4,4.5,5,5.5',
        intangible_value: '0.8,1.2,1.6,2,2.4,2.8,3.2,3.6',
        investment_cost: '0.5,1,1.5,2,2.5,3,3.5,4',
        capability_returns: '0.6,1.2,1.8,2.4,3,3.6,4.2,4.8'
    },
    {
        initial_investment: '2',
        years: '5',
        discount: '0.05',
        org_revenues: '5,4,3,2,1',
        fine_avoidance: '4,3,2,1,0',
        intangible_value: '2,3,4,5,6',
        investment_cost: '1,2,3,4,5',
        capability_returns: '1.5,2.5,3.5,4.5,5.5'
    },
    {
        initial_investment: '4',
        years: '10',
        discount: '0.11',
        org_revenues: '2,3,4,5,6,7,8,9,10,11',
        fine_avoidance: '1,2,3,4,5,6,7,8,9,10',
        intangible_value: '1,1.5,2,2.5,3,3.5,4,4.5,5,5.5',
        investment_cost: '0.5,1,1.5,2,2.5,3,3.5,4,4.5,5',
        capability_returns: '0.6,1.2,1.8,2.4,3,3.6,4.2,4.8,5.4,6'
    },
    {
        initial_investment: '2.2',
        years: '6',
        discount: '0.09',
        org_revenues: '3,5,7,9,11,13',
        fine_avoidance: '2,4,6,8,10,12',
        intangible_value: '1.2,1.6,2.0,2.4,2.8,3.2',
        investment_cost: '0.7,1.4,2.1,2.8,3.5,4.2',
        capability_returns: '0.9,1.8,2.7,3.6,4.5,5.4'
    },
    {
        initial_investment: '5',
        years: '7',
        discount: '0.10',
        org_revenues: '10,9,8,7,6,5,4',
        fine_avoidance: '5,4,3,2,1,0,0',
        intangible_value: '4,3,2,1,0,0,0',
        investment_cost: '2,3,4,5,6,7,8',
        capability_returns: '3,2,1,0,0,0,0'
    },
    {
        initial_investment: '3.5',
        years: '8',
        discount: '0.08',
        org_revenues: '1,1.5,2,2.5,3,3.5,4,4.5',
        fine_avoidance: '2,2.5,3,3.5,4,4.5,5,5.5',
        intangible_value: '0.8,1.2,1.6,2,2.4,2.8,3.2,3.6',
        investment_cost: '0.5,1,1.5,2,2.5,3,3.5,4',
        capability_returns: '0.6,1.2,1.8,2.4,3,3.6,4.2,4.8'
    }
];
