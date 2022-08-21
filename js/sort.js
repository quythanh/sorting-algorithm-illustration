// object literal
const Render = {
    app: function() {
        $('#app').html(`
            <div id="illu"></div>
            <div id="debug">
                <div id="code"></div>
                <div id="expl"></div>
                <div id="var"></div>
            </div>
        `);
    },
    box: function(listNum) {
        let html = '';
        listNum.forEach((num, index) => {
            html += `<div class="num-box" style="--i: ${index};"><span>${num}</span></div>`;
        })
        $('#illu').html(html);
    },
    header: function(html) {
        $('header').html(html);
    },
    code: function(alg) {
        $.getJSON('./data/code.json', data => $('#code').html(`<pre><div class='cpp'>${data[alg]}</div></pre>`))
    },
    var: function(v) {
        let html = '';
        if (v.i < v.n)
            html += `<h2><b>i = </b>${v.i}</h2>`;
        if (v.j < v.n && v.j > v.i)
            html += `<h2><b>j = </b>${v.j}</h2>`;
        if (v.min != -1)
            html += `<h2><b>min = </b>${v.min}</h2>`;
        $('#var').html(html);
    },
    explain: {
        compare: function(a = {txt, val}, b = {txt, val}, exprStatus = "", expr = "&lt;") {
            $('#expl').html(`
                <h2>So sánh ${a.txt} ${expr} ${b.txt}</h2>
                <h2 class="${exprStatus}">${a.val} ${expr} ${b.val}</h2>
            `);
        },
        set: function(v = {txt, val}) {
            $('#expl').html(`
                <h2>Đặt ${v.txt} = ${v.val}</h2>
            `);
        },
        inc: function(v = {txt, val}) {
            $('#expl').html(`
                <h2>Tăng ${v.txt} = ${v.val}</h2>
            `);
        },
        custom: function(html) {
            $('#expl').html(html);
        },
    }
}

const Clear = {
    app: function() {
        $('#app').html('');
    },
    explain: function() {
        $('#expl').html('');
    },
}

class SortVar {
    constructor (i, j, min, n) {
        this.i = i;
        this.j = j;
        this.n = n;
        
        this.min = min;

        // generate random list
        this.listNum = [];
        for (let i = 0; i < n; i++)
            this.listNum.push(Math.round(Math.random()*100));
        
        // Render boxes
        Render.box(this.listNum);
        this.listBox = [...document.querySelectorAll('.num-box')];
    }

    incI() {
        this.i++;
        Render.var(this);
    }

    setI(i) {
        this.i = i;
        Render.var(this);
    }

    incJ() {
        this.j++;
        Render.var(this);
    }

    setJ(j) {
        this.j = j;
        Render.var(this);
    }

    setMin(min) {
        this.min = min;
        Render.var(this);
    }
}

class SelectionSort {
    constructor (n) {
        this.var = new SortVar(-1, -2, -1, n);
        this.step = 0;
        
        this.boxes = this.var.listBox;
        this.listNum = this.var.listNum;

        this.autoLoop = 0;

        this.expl = Render.explain;

        Render.code('selection');
    }

    Sort() {
        switch (this.step % 18 + 1) {
            case 1:
                this.var.incI();
                HighLightCode(2);
                this.expl.compare(
                    {txt: "i", val: this.var.i},
                    {txt: "n - 1", val: this.var.n - 1}
                );
                this.step = 1;
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 2:
                if (this.var.i < this.var.n - 1) {
                    this.expl.compare(
                        {txt: "i", val: this.var.i},
                        {txt: "n - 1", val: this.var.n - 1},
                        "true"
                    );
                    this.step = 2;
                }
                else {
                    this.expl.compare(
                        {txt: "i", val: this.var.i},
                        {txt: "n - 1", val: this.var.n - 1},
                        "false"
                    );
                    this.step = -1;
                }
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 3:
                this.var.setMin(this.var.i);
                this.expl.set({txt: "min", val: this.var.min});
                HighLightCode(3);
                this.step++;
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 4:
                if (this.var.j < this.var.n && this.var.j > 0)
                    this.step++;
                else
                    this.step = 5;
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 5:
                // inc J
                this.var.incJ();
                this.expl.inc({txt: "j", val: this.var.j});
                this.step = 6;

                HighLightCode(5);

                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 6:
                // set J
                this.var.setJ(this.var.i + 1);
                this.expl.set({txt: "j", val: this.var.j});
                this.step++;

                HighLightCode(5);

                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 7:
                // compare
                if (this.var.j < this.var.n)
                    this.step++;
                else
                    this.step = 8;
                
                this.expl.compare(
                    {txt: "j", val: this.var.j},
                    {txt: "n", val: this.var.n}
                );

                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 8:
                this.step = 9;
                this.expl.compare(
                    {txt: "j", val: this.var.j},
                    {txt: "n", val: this.var.n},
                    "true"
                );
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 9:
                this.step = 13;
                this.expl.compare(
                    {txt: "j", val: this.var.j},
                    {txt: "n", val: this.var.n},
                    "false"
                );
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 10:
                if (this.listNum[this.var.j] < this.listNum[this.var.min])
                    this.step++;
                else
                    this.step = 11;
                
                this.expl.compare(
                    {txt: "a[j]", val: this.listNum[this.var.j]},
                    {txt: "a[min]", val: this.listNum[this.var.min]}
                );
                HighLightCode(6);
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 11:
                this.step = 12;
                this.expl.compare(
                    {txt: "a[j]", val: this.listNum[this.var.j]},
                    {txt: "a[min]", val: this.listNum[this.var.min]},
                    "true"
                );
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 12:
                this.step = 4;
                this.expl.compare(
                    {txt: "a[j]", val: this.listNum[this.var.j]},
                    {txt: "a[min]", val: this.listNum[this.var.min]},
                    "false"
                );
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 13:
                this.var.setMin(this.var.j);
                this.expl.set({txt: 'min', val: this.var.min});
                if (this.var.j == this.var.n - 1)
                    this.step++;
                else
                    this.step = 3;
                
                HighLightCode(7);
                
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 14:
                if (this.var.i == this.var.min)
                    this.step = 14;
                else
                    this.step = 15;
                
                this.expl.compare(
                    {txt: "i", val: this.var.i},
                    {txt: "min", val: this.var.min},
                    "", "="
                )
                
                HighLightCode(9);

                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 15:
                this.step = 16;
                this.expl.compare(
                    {txt: "i", val: this.var.i},
                    {txt: "min", val: this.var.min},
                    "true", "="
                )
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 16:
                this.step = 17;
                this.expl.compare(
                    {txt: "i", val: this.var.i},
                    {txt: "min", val: this.var.min},
                    "false", "="
                )
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;

            case 17:
                this.step = 0;
                HighLightCode(10);
                if (this.autoLoop)
                    setTimeout(() => this.Sort(), 300);
                break;
            
            case 18:
                rmClick('#next-step', HandleNextStep);
                HighLightCode(12);
                swap(this.listNum, this.boxes, this.var.i, this.var.min);
                this.expl.custom('<h2>Hoán đổi vị trí a[i] và a[min]</h2>');
                this.step = 0;
                if (this.autoLoop == 1)
                    this.autoLoop = 0;
                else (this.autoLoop == 2)
                    setTimeout(() => this.Sort(), 4300);
                break;
            
            default:
                $('#var').html('<h1>Done</h1>');
                Clear.explain();
                HighLightCode(14);
                break;
        }
    }
}