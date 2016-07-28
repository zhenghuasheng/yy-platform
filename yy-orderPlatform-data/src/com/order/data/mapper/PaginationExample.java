package com.order.data.mapper;

/**
 * Created by zhenghuasheng on 2016/6/19.
 */
public abstract class PaginationExample {
    private Integer pageIndex;
    private Integer pageCount;

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }
}
