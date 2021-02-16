module.exports = {
  docs: [
    {
      type: 'category',
      label:'👏 欢迎',
      items:['welcome/qucikstart']
    },
     {
      type: 'category',
      label:'🧭 指南',
      collapsed:false,
      items:['guide/global-configuration','guide/dynamic-configuration','guide/hooks','guide/tracing','guide/notify']
    },
    {
      type: 'category',
      label:'📖 API',
      collapsed:false,
      items:['api/alipay']
    },
  ],
};
