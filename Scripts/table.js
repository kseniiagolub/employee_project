class Table {
    constructor(selector, headers, removeFn, removeIconClass) {
        this.headers = headers;
        this.removeFn = removeFn;
        this.removeIconClass = removeIconClass || 'fa fa-trash';
        let $table = $(selector);
        let $thead = $('<thead>');
        $table.append($thead);
        this.fillThead.call(this, $thead);
        this.$tbody = $('<tbody>');
        $table.append(this.$tbody);
    }
    
    fillThead = function (thead) {
        let $tr = $('<tr>');
        this.headers.map(this.createTableHeader).forEach(function (th) {
            $tr.append(th);
        })
        if (this.removeFn) {
            $tr.append($('<th>'))
        }
        thead.append($tr)
    }

    createTableHeader = function (header) {
        return $('<th>', {text:header});
    }

    addRow = function (data) {
        this.$tbody.append(this.createRow.call(this, data))
    }

    createRow = function (data) {
        let $row = $('<tr>');
        this.headers.map(function (header) {
            return $('<td>', {text: data[header]})
        }).forEach(function (td) {
            $row.append(td)
        })
        if (this.removeFn) {
            let $iconRemove = $('<i>', {class: this.removeIconClass + ' clickable'})
            $iconRemove.on('click', function (event) {
                event.preventDefault();
                if (this.removeFn(data)) {
                    $row.remove();
                }
            }.bind(this))
            let $tdRemove = $('<td>');
            $tdRemove.append($iconRemove);
            $row.append($tdRemove);
        }
        return $row;
    }
}