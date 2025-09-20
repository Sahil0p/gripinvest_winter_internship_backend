exports.summarizeErrors = async (logs) => {
  const summary = {};
  logs.forEach(log => {
    if (log.error_message) {
      const userKey = log.user_id || log.email || 'unknown';
      summary[userKey] = summary[userKey] || {};
      summary[userKey][log.error_message] = (summary[userKey][log.error_message] || 0) + 1;
    }
  });
  return summary;
};
