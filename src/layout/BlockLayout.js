class BoxModel {
    // calculate all the box dimesnions from style

    static calculate(node, availableWidth, availableHeight) {
        const style = node.style;

        const paddingTop = style.padding.top || 0;
        const paddingRight = style.padding.right || 0;
        const paddingBottom = style.padding.bottom || 0;
        const paddingLeft = style.padding.left || 0;

        const marginTop = style.margin.top || 0;
        const marginRight = style.margin.right || 0;
        const marginBottom = style.margin.bottom || 0;
        const marginLeft = style.margin.left || 0;

        const borderWidth = style.border ? (style.border.width || 0) : 0;

        let contentWidth;
        if (style.width !== null && style?.width !== undefined) {
            contentWidth = style.width - paddingLeft - paddingRight - (borderWidth * 2);
            contentWidth = Math.max(0, contentWidth);
        } else {
            contentWidth = availableWidth - paddingLeft - paddingRight - (borderWidth * 2);
            contentWidth = Math.max(0, contentWidth);
        }

        let contentHeight;
        if (style.height !== null && style.height !== undefined) {
            contentHeight = style.height - paddingTop - paddingBottom - (borderWidth * 2);
            contentHeight = Math.max(0, contentHeight);
        } else {
            contentHeight = 0;
        }

        const paddingBox = {
            width: contentWidth + paddingLeft + paddingRight,
            height: contentHeight + paddingTop + paddingBottom
        }

        const borderBox = {
            width: paddingBox.width + (borderWidth * 2),
            height: paddingBox.height + (borderWidth * 2),
        }

        const marginBox = {
            width: borderBox.width + marginLeft + marginRight,
            height: borderBox.height + marginTop + marginBottom,
        }


        return {
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,


            contentWidth,
            contentHeight,

            contentBox: { width: contentWidth, height: contentHeight },
            paddingBox,
            borderBox,
            marginBox
        }

    }

    static Positions(node, x, y, boxModel) {
        const { marginTop, marginLeft, borderWidth, paddingTop, paddingLeft } = boxModel;

        node.layout.x = x;
        node.layout.y = y;
        node.layout.marginBox.x = x;
        node.layout.marginBox.y = y;
        node.layout.marginBox.width = boxModel.marginBox.width;
        node.layout.marginBox.height = boxModel.marginBox.height;


        const borderX = x + marginLeft;
        const borderY = y + marginTop;
        node.layout.borderBox.x = borderX;
        node.layout.borderBox.y = borderY;
        node.layout.borderBox.width = boxModel.borderBox.width;
        node.layout.borderBox.height = boxModel.borderBox.height;

        const paddingX = borderX + borderWidth;
        const paddingY = borderY + borderWidth;
        node.layout.paddingBox.x = paddingX;
        node.layout.paddingBox.y = paddingY;
        node.layout.paddingBox.width = boxModel.padding.width;
        node.layout.paddingBox.height = boxModel.padding.height;


        const contentX = paddingX +  paddingLeft;
        const contentY  =  paddingY  +  paddingTop;
        node.layout.contentBox.x  =  contentX;
        node.layout.contentBox.y  =  contentY;
        // node.layout.contentBox. =  
    }
}