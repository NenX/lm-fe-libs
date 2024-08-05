import asyncHOC from './AsyncHOC';
import SingleSelector from './SingleSelector';
import MultiSelector from './MultiSelector';
import AsyncInputSelector from './InputSelector';
const AsyncSingleSelector = asyncHOC(SingleSelector);
const AsyncMultiSelector = asyncHOC(MultiSelector);
export { AsyncSingleSelector, AsyncMultiSelector, AsyncInputSelector };
