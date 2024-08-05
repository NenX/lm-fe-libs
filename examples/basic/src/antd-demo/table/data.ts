export const _dataSource = [
    {
        key: '1',
        name: 'Mike',
        cname: '马克·西',
        age: 32,
        address: '10 Downing Street',
        gender: 'male',
    },
    {
        key: '2',
        name: 'John',
        cname: '约翰·维',
        age: 42,
        address: '10 Downing Street',
        gender: 'male',
    },
]

export const _largeDataSource = Array(100)
    .fill({
        name: 'Mike',
        cname: '马克·西',
        age: 32,
        address: '10 Downing Street',
        gender: 'male',
    })
    .map((t, i) => ({ key: String(i), ...t }))

export const _columns = [
    {
        title: 'NO',
        dataIndex: 'index',
        key: 'index',
        width: 32,
        align: 'center',
        fixed: 'left',
        render: (text: any, record: object, i: number) => String(i + 1),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'CName',
        dataIndex: 'cname',
        key: 'cname',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 156,
    },
    {
        title: '职业',
        dataIndex: 'occupation',
    },
    {
        title: '创建时间',
        dataIndex: 'created',
    },
    {
        title: '联系方式',
        dataIndex: 'tel',
    },
    {
        title: '角色',
        dataIndex: 'role',
    },
    {
        title: '其他',
        dataIndex: 'other',
        width: 256,
    },
    {
        title: '操作',
        dataIndex: 'actions',
    },
]
