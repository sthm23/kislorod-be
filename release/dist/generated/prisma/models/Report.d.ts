import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReportModel = runtime.Types.Result.DefaultSelection<Prisma.$ReportPayload>;
export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null;
    _avg: ReportAvgAggregateOutputType | null;
    _sum: ReportSumAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type ReportAvgAggregateOutputType = {
    totalOrders: number | null;
    activeOrders: number | null;
    reservedOrders: number | null;
    closedOrders: number | null;
    totalRevenue: number | null;
    averageOrderValue: number | null;
};
export type ReportSumAggregateOutputType = {
    totalOrders: number | null;
    activeOrders: number | null;
    reservedOrders: number | null;
    closedOrders: number | null;
    totalRevenue: number | null;
    averageOrderValue: number | null;
};
export type ReportMinAggregateOutputType = {
    id: string | null;
    totalOrders: number | null;
    activeOrders: number | null;
    reservedOrders: number | null;
    closedOrders: number | null;
    totalRevenue: number | null;
    averageOrderValue: number | null;
};
export type ReportMaxAggregateOutputType = {
    id: string | null;
    totalOrders: number | null;
    activeOrders: number | null;
    reservedOrders: number | null;
    closedOrders: number | null;
    totalRevenue: number | null;
    averageOrderValue: number | null;
};
export type ReportCountAggregateOutputType = {
    id: number;
    totalOrders: number;
    activeOrders: number;
    reservedOrders: number;
    closedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    _all: number;
};
export type ReportAvgAggregateInputType = {
    totalOrders?: true;
    activeOrders?: true;
    reservedOrders?: true;
    closedOrders?: true;
    totalRevenue?: true;
    averageOrderValue?: true;
};
export type ReportSumAggregateInputType = {
    totalOrders?: true;
    activeOrders?: true;
    reservedOrders?: true;
    closedOrders?: true;
    totalRevenue?: true;
    averageOrderValue?: true;
};
export type ReportMinAggregateInputType = {
    id?: true;
    totalOrders?: true;
    activeOrders?: true;
    reservedOrders?: true;
    closedOrders?: true;
    totalRevenue?: true;
    averageOrderValue?: true;
};
export type ReportMaxAggregateInputType = {
    id?: true;
    totalOrders?: true;
    activeOrders?: true;
    reservedOrders?: true;
    closedOrders?: true;
    totalRevenue?: true;
    averageOrderValue?: true;
};
export type ReportCountAggregateInputType = {
    id?: true;
    totalOrders?: true;
    activeOrders?: true;
    reservedOrders?: true;
    closedOrders?: true;
    totalRevenue?: true;
    averageOrderValue?: true;
    _all?: true;
};
export type ReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReportCountAggregateInputType;
    _avg?: ReportAvgAggregateInputType;
    _sum?: ReportSumAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type GetReportAggregateType<T extends ReportAggregateArgs> = {
    [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReport[P]> : Prisma.GetScalarType<T[P], AggregateReport[P]>;
};
export type ReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithAggregationInput | Prisma.ReportOrderByWithAggregationInput[];
    by: Prisma.ReportScalarFieldEnum[] | Prisma.ReportScalarFieldEnum;
    having?: Prisma.ReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReportCountAggregateInputType | true;
    _avg?: ReportAvgAggregateInputType;
    _sum?: ReportSumAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type ReportGroupByOutputType = {
    id: string;
    totalOrders: number;
    activeOrders: number;
    reservedOrders: number;
    closedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    _count: ReportCountAggregateOutputType | null;
    _avg: ReportAvgAggregateOutputType | null;
    _sum: ReportSumAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>;
}>>;
export type ReportWhereInput = {
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    id?: Prisma.StringFilter<"Report"> | string;
    totalOrders?: Prisma.IntFilter<"Report"> | number;
    activeOrders?: Prisma.IntFilter<"Report"> | number;
    reservedOrders?: Prisma.IntFilter<"Report"> | number;
    closedOrders?: Prisma.IntFilter<"Report"> | number;
    totalRevenue?: Prisma.FloatFilter<"Report"> | number;
    averageOrderValue?: Prisma.FloatFilter<"Report"> | number;
};
export type ReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    totalOrders?: Prisma.IntFilter<"Report"> | number;
    activeOrders?: Prisma.IntFilter<"Report"> | number;
    reservedOrders?: Prisma.IntFilter<"Report"> | number;
    closedOrders?: Prisma.IntFilter<"Report"> | number;
    totalRevenue?: Prisma.FloatFilter<"Report"> | number;
    averageOrderValue?: Prisma.FloatFilter<"Report"> | number;
}, "id">;
export type ReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
    _count?: Prisma.ReportCountOrderByAggregateInput;
    _avg?: Prisma.ReportAvgOrderByAggregateInput;
    _max?: Prisma.ReportMaxOrderByAggregateInput;
    _min?: Prisma.ReportMinOrderByAggregateInput;
    _sum?: Prisma.ReportSumOrderByAggregateInput;
};
export type ReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Report"> | string;
    totalOrders?: Prisma.IntWithAggregatesFilter<"Report"> | number;
    activeOrders?: Prisma.IntWithAggregatesFilter<"Report"> | number;
    reservedOrders?: Prisma.IntWithAggregatesFilter<"Report"> | number;
    closedOrders?: Prisma.IntWithAggregatesFilter<"Report"> | number;
    totalRevenue?: Prisma.FloatWithAggregatesFilter<"Report"> | number;
    averageOrderValue?: Prisma.FloatWithAggregatesFilter<"Report"> | number;
};
export type ReportCreateInput = {
    id?: string;
    totalOrders: number;
    activeOrders: number;
    reservedOrders: number;
    closedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
};
export type ReportUncheckedCreateInput = {
    id?: string;
    totalOrders: number;
    activeOrders: number;
    reservedOrders: number;
    closedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
};
export type ReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    activeOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    reservedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    closedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRevenue?: Prisma.FloatFieldUpdateOperationsInput | number;
    averageOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type ReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    activeOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    reservedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    closedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRevenue?: Prisma.FloatFieldUpdateOperationsInput | number;
    averageOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type ReportCreateManyInput = {
    id?: string;
    totalOrders: number;
    activeOrders: number;
    reservedOrders: number;
    closedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
};
export type ReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    activeOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    reservedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    closedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRevenue?: Prisma.FloatFieldUpdateOperationsInput | number;
    averageOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type ReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    totalOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    activeOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    reservedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    closedOrders?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRevenue?: Prisma.FloatFieldUpdateOperationsInput | number;
    averageOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type ReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type ReportAvgOrderByAggregateInput = {
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type ReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type ReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type ReportSumOrderByAggregateInput = {
    totalOrders?: Prisma.SortOrder;
    activeOrders?: Prisma.SortOrder;
    reservedOrders?: Prisma.SortOrder;
    closedOrders?: Prisma.SortOrder;
    totalRevenue?: Prisma.SortOrder;
    averageOrderValue?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalOrders?: boolean;
    activeOrders?: boolean;
    reservedOrders?: boolean;
    closedOrders?: boolean;
    totalRevenue?: boolean;
    averageOrderValue?: boolean;
}, ExtArgs["result"]["report"]>;
export type ReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalOrders?: boolean;
    activeOrders?: boolean;
    reservedOrders?: boolean;
    closedOrders?: boolean;
    totalRevenue?: boolean;
    averageOrderValue?: boolean;
}, ExtArgs["result"]["report"]>;
export type ReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    totalOrders?: boolean;
    activeOrders?: boolean;
    reservedOrders?: boolean;
    closedOrders?: boolean;
    totalRevenue?: boolean;
    averageOrderValue?: boolean;
}, ExtArgs["result"]["report"]>;
export type ReportSelectScalar = {
    id?: boolean;
    totalOrders?: boolean;
    activeOrders?: boolean;
    reservedOrders?: boolean;
    closedOrders?: boolean;
    totalRevenue?: boolean;
    averageOrderValue?: boolean;
};
export type ReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "totalOrders" | "activeOrders" | "reservedOrders" | "closedOrders" | "totalRevenue" | "averageOrderValue", ExtArgs["result"]["report"]>;
export type $ReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Report";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        totalOrders: number;
        activeOrders: number;
        reservedOrders: number;
        closedOrders: number;
        totalRevenue: number;
        averageOrderValue: number;
    }, ExtArgs["result"]["report"]>;
    composites: {};
};
export type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReportPayload, S>;
export type ReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReportCountAggregateInputType | true;
};
export interface ReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Report'];
        meta: {
            name: 'Report';
        };
    };
    findUnique<T extends ReportFindUniqueArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReportFindFirstArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReportFindManyArgs>(args?: Prisma.SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReportCreateArgs>(args: Prisma.SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReportCreateManyArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReportDeleteArgs>(args: Prisma.SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReportUpdateArgs>(args: Prisma.SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReportUpdateManyArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReportUpsertArgs>(args: Prisma.SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReportCountArgs>(args?: Prisma.Subset<T, ReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReportCountAggregateOutputType> : number>;
    aggregate<T extends ReportAggregateArgs>(args: Prisma.Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>;
    groupBy<T extends ReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReportGroupByArgs['orderBy'];
    } : {
        orderBy?: ReportGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReportFieldRefs;
}
export interface Prisma__ReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReportFieldRefs {
    readonly id: Prisma.FieldRef<"Report", 'String'>;
    readonly totalOrders: Prisma.FieldRef<"Report", 'Int'>;
    readonly activeOrders: Prisma.FieldRef<"Report", 'Int'>;
    readonly reservedOrders: Prisma.FieldRef<"Report", 'Int'>;
    readonly closedOrders: Prisma.FieldRef<"Report", 'Int'>;
    readonly totalRevenue: Prisma.FieldRef<"Report", 'Float'>;
    readonly averageOrderValue: Prisma.FieldRef<"Report", 'Float'>;
}
export type ReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
};
export type ReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
};
export type ReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
};
