import Electrician from '../models/Electrician';
import Issue from '../models/Issue';

export const assignIssue = async (issueId) => {
  try {
    const electricians = await Electrician.find({ available: true });
    if (!electricians.length) {
      throw new Error('No available electricians');
    }

    // Find the electrician with the least number of assigned issues
    let selectedElectrician = electricians[0];
    for (let electrician of electricians) {
      if (electrician.assignedIssues.length < selectedElectrician.assignedIssues.length) {
        selectedElectrician = electrician;
      }
    }

    const issue = await Issue.findById(issueId);
    if (!issue) {
      throw new Error('Issue not found');
    }

    issue.assignedTo = selectedElectrician._id;
    selectedElectrician.assignedIssues.push(issue._id);

    await issue.save();
    await selectedElectrician.save();

    return issue;
  } catch (error) {
    console.error('Error assigning issue:', error);
    throw error;
  }
};

export const assignOpenIssues = async () => {
  try {
    const openIssues = await Issue.find({ assignedTo: null });
    for (let issue of openIssues) {
      await assignIssue(issue._id);
    }
  } catch (error) {
    console.error('Error assigning open issues:', error);
    throw error;
  }
};
